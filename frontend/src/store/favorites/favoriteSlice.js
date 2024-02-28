import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const favoriteIndex = state.favorites.indexOf(action.payload);
      let newFavoriteList;
      if (favoriteIndex === -1) {
        newFavoriteList = [...state.favorites, action.payload];
        // localStorage.setItem("favorites", JSON.stringify(state.favorites));
      } else {
        newFavoriteList = state.favorites.filter(
          (itemId) => itemId !== action.payload
        );
        // localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
      return {
        ...state,
        favorites: newFavoriteList,
      };
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
