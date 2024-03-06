import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchCartItems = createAsyncThunk(
//   "cart/fetchCartItems",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch("http://localhost:4000/api/cart");
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) {
        throw new Error("No cart items found");
      }
      return cart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const currentCartState = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  cartItems: currentCartState,
};

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const calculateTotalItemPrice = (price, discount, quantity) => {
  return Math.round(price * (1 - discount / 100)) * quantity;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        state.cartItems[index].quantity += 1;
        state.cartItems[index].totalItemPrice = calculateTotalItemPrice(
          product.price,
          product.discount || 0,
          state.cartItems[index].quantity
        );
      } else {
        product.quantity = 1;
        product.totalItemPrice = calculateTotalItemPrice(
          product.price,
          product.discount || 0,
          product.quantity
        );
        state.cartItems.push(product);
      }

      saveCartToLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      saveCartToLocalStorage(state.cartItems);
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === id);

      if (index !== -1) {
        state.cartItems[index].quantity += 1;
        state.cartItems[index].totalItemPrice = calculateTotalItemPrice(
          state.cartItems[index].price,
          state.cartItems[index].discount || 0,
          state.cartItems[index].quantity
        );
      }

      saveCartToLocalStorage(state.cartItems);
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === id);

      if (index !== -1) {
        state.cartItems[index].quantity -= 1;

        if (state.cartItems[index].quantity < 1) {
          state.cartItems.splice(index, 1);
        } else {
          state.cartItems[index].totalItemPrice = calculateTotalItemPrice(
            state.cartItems[index].price,
            state.cartItems[index].discount || 0,
            state.cartItems[index].quantity
          );
        }
      }

      saveCartToLocalStorage(state.cartItems);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
