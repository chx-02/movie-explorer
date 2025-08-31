"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addFavorite, removeFavorite } from "@/redux/favoritesSlice";
import { fetchTrendingMovies, searchMovies, tmdbImg } from "@/lib/tmdb";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

type Movie = {
  id: number;
  title: string;
  original_language: string;
  poster_path: string | null;
  release_date?: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    let canceled = false;
    fetchTrendingMovies()
      .then((data) => {
        if (!canceled && data?.results) {
          setMovies(data.results);
        }
      })
      .catch((err) => console.error(err));
    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      (async () => {
        try {
          if (search.trim() === "") {
            const data = await fetchTrendingMovies();
            setMovies(data.results || []);
          } else {
            const data = await searchMovies(search);
            setMovies(data.results || []);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <main
      className={poppins.className}
      style={{
        backgroundColor: "#121212",
        color: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Title + Search */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          marginTop: "40px",
        }}
      >
        <h1
          style={{
            fontSize: 40,
            fontWeight: "700",
            marginBottom: 20,
            fontFamily: "Times New Roman, serif",
          }}
        >
          🎬 Movie Explorer
        </h1>

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            maxWidth: "500px",
            border: "1px solid #333",
            borderRadius: "8px",
            background: "#1f1f1f",
            color: "#fff",
          }}
        />
      </div>

      {/* Movies */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {movies
          .filter(
            (m, index, self) =>
              index ===
              self.findIndex(
                (x) => x.title?.toLowerCase() === m.title?.toLowerCase()
              )
          )
          .filter((m) =>
            ["en", "hi", "ta", "te", "ml"].includes(m.original_language)
          )
          .filter((m) => m.title?.toLowerCase() !== "together")
          .map((movie) => (
            <div
              key={movie.id}
              style={{
                background: "#1e1e1e",
                borderRadius: "10px",
                overflow: "hidden",
                textAlign: "center",
                paddingBottom: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }}
            >
              <Link href={`/movie/${movie.id}`}>
                <Image
                  src={
                    movie.poster_path
                      ? tmdbImg(movie.poster_path, "w500")
                      : "/black-poster.png"
                  }
                  alt={movie.title}
                  width={300}
                  height={450}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/black-poster.png";
                  }}
                />
              </Link>
              <div style={{ padding: "8px" }}>
                <strong>{movie.title}</strong>
                <div style={{ fontSize: "0.9em", opacity: 0.7 }}>
                  {movie.release_date?.slice(0, 4) ?? "—"}
                </div>

                {favorites.find((f) => f.id === movie.id) ? (
                  <button
                    onClick={() => dispatch(removeFavorite(movie.id))}
                    style={{
                      marginTop: 8,
                      padding: "6px 12px",
                      backgroundColor: "#ff4757",
                      color: "white",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ⭐ Remove
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(
                        addFavorite({
                          id: movie.id,
                          title: movie.title,
                          year: movie.release_date?.slice(0, 4) ?? "—",
                        })
                      )
                    }
                    style={{
                      marginTop: 8,
                      padding: "6px 12px",
                      backgroundColor: "#1e90ff",
                      color: "white",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ➕ Add
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Favorites */}
      <h2 style={{ marginTop: 40, fontWeight: "600" }}>⭐ Current Favorites:</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((f) => (
            <li key={f.id}>
              {f.title} ({f.year})
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet.</p>
      )}
    </main>
  );
}
