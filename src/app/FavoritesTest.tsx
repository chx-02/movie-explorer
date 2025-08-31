"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addFavorite, removeFavorite, clearFavorites } from "../redux/favoritesSlice";

export default function FavoritesTest() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites); // string[]

  const sampleMovie = "Inception";

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Favorites Test</h1>

      <button onClick={() => dispatch(addFavorite(sampleMovie))}>Add "Inception"</button>
      <button onClick={() => dispatch(removeFavorite(sampleMovie))}>Remove "Inception"</button>
      <button onClick={() => dispatch(clearFavorites())}>Clear All</button>

      <div className="mt-6">
        <h2 className="font-semibold text-lg">Current Favorites:</h2>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
}
