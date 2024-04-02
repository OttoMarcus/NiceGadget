import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const synchronizeOrder = createAsyncThunk(
  "todos/synchronizeOrder",
  async function () {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const resultSlice = userId.slice(1, -1);

      if (resultSlice && orders.length > 0) {
        for (const order of orders) {
          const response = await fetch(
            `/api/orders/synchronize/${order.orderNo}`,
            {
              method: `PUT`,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                customerId: resultSlice,
                order: order,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          return data;
        }
      }
    } catch (error) {
      console.warn("Error updating wishlist:", error);
      throw error; // Throw the error to be handled in the UI
    }
  }
);

export const orderAddNewUnAvt = createAsyncThunk(
  "todos/orderAddNewUnAvt",
  async function (order) {
    try {
      const response = await fetch(`/api/orders`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(`post unAvt , `, data);
      return data;
    } catch (error) {
      console.warn("Error fetching wishlist:", error);
      throw error;
    }
  }
);
export const orderAddNew = createAsyncThunk(
  "todos/orderAddNew",
  async function (order) {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      const resultSlice = userId.slice(1, -1);
      if (token && resultSlice) {
        const response = await fetch(`/api/orders`, {
          method: `POST`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(order),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        return data;
      }
    } catch (error) {
      console.warn("Error fetching wishlist:", error);
      throw error;
    }
  }
);
export const orderGetNew = createAsyncThunk(
  "todos/orderGetNew",
  async function () {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      const resultSlice = userId?.slice(1, -1);

      if (!token || !resultSlice) {
        throw new Error("Token or user ID is missing");
      }

      const response = await fetch(`/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          customerId: resultSlice,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(`data get`, data);
      return data;
    } catch (error) {
      console.warn("Error fetching wishlist:", error);
      throw error;
    }
  }
);

const OrderNew = createSlice({
  name: `orderNew`,
  initialState: {
    orders: JSON.parse(localStorage.getItem("orders")) || [],
  },
  reducers: {
    addOrderNew: (state, action) => {
      state.orders.push(action.payload);
    },
    SetOrder: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(orderGetNew.fulfilled, (state, action) => {
      state.orders = action.payload;
      // console.log(`state order`  , action.payload)
    });
    builder.addCase(orderAddNew.fulfilled, (state, action) => {
      state.orders.push(action.payload);
      // console.log(`state order`  , action.payload)
    });
    builder.addCase(orderAddNewUnAvt.fulfilled, (state, action) => {
      console.log(`action.payload`, action.payload);
      state.orders.push(action.payload);
      // console.log(`state order`  , action.payload)
    });
    builder.addCase(synchronizeOrder.fulfilled, (state, action) => {
      console.log(`action.synchronizre`, action.payload);
      state.orders.push(action.payload);
      // console.log(`state order`  , action.payload)
    });
  },
});

export const { addOrderNew, SetOrder } = OrderNew.actions;
export default OrderNew.reducer;
