import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title: string;
  year?: string; // added so it matches your Home.tsx
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as Movie[],
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      if (!state.find((m) => m.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      return state.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
