import React from "react";
import Image from "next/image";
import { getMovieAndCredits, tmdbImg } from "@/lib/tmdb";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { details: movie, cast } = await getMovieAndCredits(id);

  return (
    <main
      style={{
        backgroundColor: "#121212",
        color: "#f5f5f5",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
        {/* Poster */}
        <Image
          src={
            movie.poster_path
              ? tmdbImg(movie.poster_path, "w500")
              : "/black-poster.png"
          }
          alt={movie.title}
          width={350}
          height={525}
          style={{
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
            objectFit: "cover",
          }}
        />

        {/* Movie Info */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            {movie.title}
          </h1>
          <p style={{ opacity: 0.8, marginBottom: "12px" }}>
            {movie.release_date?.slice(0, 4) ?? "—"} •{" "}
            {movie.runtime ? `${movie.runtime} min` : "N/A"}
          </p>
          <p style={{ marginBottom: "24px", lineHeight: 1.6 }}>
            {movie.overview}
          </p>

          {/* Cast Section */}
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>🎭 Cast</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "20px",
            }}
          >
            {cast.slice(0, 12).map((actor: any) => (
              <div
                key={actor.cast_id}
                style={{
                  textAlign: "center",
                  backgroundColor: "#1e1e1e",
                  borderRadius: "12px",
                  padding: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src={
                    actor.profile_path
                      ? tmdbImg(actor.profile_path, "w185")
                      : "/avatar.png"
                  }
                  alt={actor.name}
                  width={120}
                  height={160}
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                    marginBottom: "8px",
                  }}
                />
                <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                  {actor.name}
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.7,
                  }}
                >
                  as {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
