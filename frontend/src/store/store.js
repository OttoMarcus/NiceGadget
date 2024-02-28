import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import favoriteSlice from "./favorites/favoriteSlice";

export const store = configureStore({
  reducer: {
    favorite: favoriteSlice,
    cart: cartSlice,
  },
});
