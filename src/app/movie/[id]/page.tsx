// src/app/movie/[id]/page.tsx
import Image from "next/image";
import { tmdbImg, getMovieAndCredits } from "@/lib/tmdb";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
};

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export default async function MoviePage({ params }: { params: { id: string } }) {
  const { details: movie, cast } = await getMovieAndCredits(params.id);

  return (
    <main
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          {/* Poster */}
          {movie.poster_path && (
            <Image
              src={tmdbImg(movie.poster_path, "w500")}
              alt={movie.title}
              width={300}
              height={450}
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
              }}
            />
          )}

          {/* Info */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            {/* Title */}
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                marginBottom: "10px",
                fontFamily: "Times New Roman, serif",
              }}
            >
              {movie.title}
            </h1>

            {/* Year + Rating */}
            <p style={{ fontSize: "18px", opacity: 0.8, marginBottom: "15px" }}>
              📅 {movie.release_date?.slice(0, 4) || "—"} &nbsp; | &nbsp; ⭐{" "}
              {movie.vote_average?.toFixed(1) || "N/A"}/10
            </p>

            {/* Overview */}
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                marginBottom: "20px",
                fontFamily: "Times New Roman, serif",
              }}
            >
              {movie.overview || "No description available."}
            </p>
          </div>
        </div>

        {/* Cast */}
        <h2
          style={{
            marginTop: "40px",
            marginBottom: "15px",
            fontSize: "28px",
            fontWeight: "bold",
            fontFamily: "Times New Roman, serif",
          }}
        >
          🎭 Cast
        </h2>
        <div style={{ display: "flex", gap: "15px", overflowX: "auto" }}>
          {cast.slice(0, 8).map((actor: CastMember) => (
            <div
              key={actor.id}
              style={{ width: "120px", textAlign: "center", flexShrink: 0 }}
            >
              <Image
                src={
                  actor.profile_path
                    ? tmdbImg(actor.profile_path, "w200")
                    : "/black-poster.png"
                }
                alt={actor.name}
                width={120}
                height={160}
                style={{
                  borderRadius: "8px",
                  objectFit: "cover",
                  marginBottom: "6px",
                }}
              />
              <p style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                {actor.name}
              </p>
              <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                as {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
