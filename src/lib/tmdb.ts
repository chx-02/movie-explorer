// src/lib/tmdb.ts

// Build TMDB image URL
export function tmdbImg(path: string, size: string = "w500") {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

// 🔹 Fetch movie details + credits
export async function getMovieAndCredits(id: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_KEY;

  if (!apiKey) {
    throw new Error("❌ TMDB API key missing. Check your .env.local file.");
  }

  const [detailsRes, creditsRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
      { next: { revalidate: 60 } }
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
      { next: { revalidate: 60 } }
    ),
  ]);

  if (!detailsRes.ok) throw new Error("❌ Failed to fetch movie details");
  if (!creditsRes.ok) throw new Error("❌ Failed to fetch movie credits");

  const details = await detailsRes.json();
  const credits = await creditsRes.json();

  return { details, cast: credits.cast };
}

// 🔹 Get trending movies
export async function fetchTrendingMovies() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_KEY;

  if (!apiKey) {
    throw new Error("❌ TMDB API key missing. Check your .env.local file.");
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("❌ Failed to fetch trending movies");
  }

  return res.json(); // { page, results, total_pages, total_results }
}

// 🔹 Search movies by query
export async function searchMovies(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_KEY;

  if (!apiKey) {
    throw new Error("❌ TMDB API key missing. Check your .env.local file.");
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=1&include_adult=false`
  );

  if (!res.ok) {
    throw new Error("❌ Failed to search movies");
  }

  return res.json(); // { page, results, total_pages, total_results }
}
