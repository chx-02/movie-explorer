import React from "react";
import Image from "next/image";
import { getMovieAndCredits, tmdbImg } from "@/lib/tmdb";

interface CastMember {
  cast_id: number;
  name: string;
  character: string;
}

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
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        {/* Poster */}
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
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            objectFit: "cover",
          }}
        />

        {/* Movie Info */}
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {movie.title}
          </h1>
          <p style={{ opacity: 0.8, marginBottom: "10px" }}>
            {movie.release_date?.slice(0, 4) ?? "—"} •{" "}
            {movie.runtime ? `${movie.runtime} min` : "N/A"}
          </p>
          <p style={{ marginBottom: "20px" }}>{movie.overview}</p>

          <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Cast</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cast.slice(0, 10).map((actor: CastMember) => (
              <li key={actor.cast_id} style={{ marginBottom: "6px" }}>
                {actor.name} as {actor.character}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
