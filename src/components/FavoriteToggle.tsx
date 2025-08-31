"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addFavorite, removeFavorite } from "@/redux/favoritesSlice";

export default function FavoriteToggle({ movieTitle }: { movieTitle: string }) {
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();

  const isFavorite = favorites.includes(movieTitle);

  return (
    <button
      onClick={() =>
        isFavorite
          ? dispatch(removeFavorite(movieTitle))
          : dispatch(addFavorite(movieTitle))
      }
      style={{
        marginLeft: 12,
        padding: "6px 12px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        backgroundColor: isFavorite ? "#ff4757" : "#1e90ff",
        color: "white",
      }}
    >
      {isFavorite ? "⭐ Remove" : "➕ Add"}
    </button>
  );
}
