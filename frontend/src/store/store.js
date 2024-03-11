import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import favoriteSlice from "./favorites/favoriteSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: {
    favorite: favoriteSlice,
    cart: cartSlice,
    user: userSlice,
  },
});
