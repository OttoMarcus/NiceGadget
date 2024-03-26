import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const orderGet = createAsyncThunk("orderGet", async function () {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    const resultSlice = userId.slice(1, -1);

    if (token && resultSlice) {
      const response = await fetch(`/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          customerId: resultSlice,
        },
      });
      const data = await response.json();
      // console.log(`orderGET`, data);
      // data.forEach(({products}) => {
      //     console.log(products)
      // })
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let ret = data.products || [];

      return ret;
    }
  } catch (error) {
    console.warn("Error fetching wishlist:", error);
    throw error;
  }
});

const currentLocalInitialState = localStorage.getItem("orders");
const parsedorders = currentLocalInitialState
  ? JSON.parse(currentLocalInitialState)
  : [];
const order = createSlice({
  name: `order`,
  initialState: {
    order: parsedorders,
  },
  reducers: {
    addOrder: (state, action) => {
      state.order.push(action.payload);
    },
    updateOrder: (state, action) => {
      const { orderId, updatedOrder } = action.payload;
      const index = state.order.findIndex((order) => order.id === orderId);
      if (index !== -1) {
        state.order[index] = updatedOrder;
      }
    },
    deleteOrder: (state, action) => {
      const orderId = action.payload;
      state.order = state.order.filter((order) => order.id !== orderId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(orderGet.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

export const { addOrder, updateOrder, deleteOrder } = order.actions;
export default order.reducer;
