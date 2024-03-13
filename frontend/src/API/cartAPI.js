import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartForUser",
  async (_, { getState, rejectWithValue }) => {
    const { isAuthorized } = getState().user;
    const token = localStorage.getItem("token");

    if (isAuthorized && token) {
      try {
        const response = await fetch("http://localhost:4000/api/cart", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const cart = await response.json();
        return cart;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      return cart;
    }
  }
);

export const addToCartServer = createAsyncThunk(
  "cart/addToCartServer",
  async ({ _id, category, ...productDetails }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:4000/api/cart/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ _id, category, ...productDetails }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const incrementQuantityServer = createAsyncThunk(
  "cart/incrementCartItemQuantityServer",
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:4000/api/cart/increase/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ productId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const decrementQuantityServer = createAsyncThunk(
  "cart/decrementCartItemQuantityServer",
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:4000/api/cart/decrease/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ productId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCartServer = createAsyncThunk(
  "cart/removeFromCartServer",
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:4000/api/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedCart = await response.json();
      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
