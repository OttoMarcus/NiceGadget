import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { key, value } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.key === key
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].value += value;
      } else {
        state.cartItems.push({ key, value });
      }
    },

    removeFromCart: (state, action) => {
      const { key, value } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.key === key
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].value -= value;
        if (state.cartItems[existingItemIndex].value <= 0) {
          state.cartItems.splice(existingItemIndex, 1);
        }
      } else {
        console.log("Item not found in cart");
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
