import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (user) {
    try {
      // console.log(111111111111111111111, user);
      const response = await fetch(`http://localhost:4000/api/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          id: user._id,
        },
      });
      const data = await response.json();
      console.log(`data fetchTodosfetchTodosfetchTodosfetchTodos`, response);
      if (response.ok !== 200) {
        throw new Error("Network response was not ok");
      }

      return data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error; // Перебрасываем ошибку, чтобы ее можно было обработать в UI
    }
  }
);
export const fetchChange = createAsyncThunk(
  "todos/fetchChange",
  async function ({ user, ...products }) {
    try {
      console.log(`cyka cyda dochla1`, products.favor);
      // console.log(`change featchfeatchfeatchfeatchfeatch`, user , products)
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/wishlist`, {
        method: `PUT`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id: user._id, products: products.favor }),
      });
      console.log(`cyka cyda dochla`, user, products);
      if (response.ok !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(`data fetchChangefetchChangefetchChangefetchChange`, data);
      return data;
    } catch (error) {
      console.error("Error updating wishlist:", error);
      throw error; // Перебрасываем ошибку, чтобы ее можно было обработать в UI
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    status: null,
    favorites: [],
    error: null,
  },
  reducers: {
    Tooglefavorites: (state, action) => {
      let approve = false;
      state.favorites.filter((el) => {
        if (el.id === action.payload.id) {
          approve = true;
          return true;
        }
        return false;
      });
      !approve
        ? state.favorites.push(action.payload)
        : (state.favorites = state.favorites.filter(
            (el) => el.id !== action.payload.id
          ));
      // console.log(`in slice ` , state.favorites)
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    SetFavor: (state, action) => {
      state.favorites = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "resolve";
        // console.log(`action. payload `, action.payload?.products)
        state.favorites = action.payload?.products;
        localStorage.setItem(
          "favorites",
          JSON.stringify(action.payload?.products)
        );
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchChange.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchChange.fulfilled, (state, action) => {
        state.status = "resolve";
        // console.log(`action. payload `, action.payload?.products)
        // state.favorites = action.payload?.products;
        // localStorage.setItem("favorites", JSON.stringify(action.payload?.products));
      })
      .addCase(fetchChange.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { Tooglefavorites, SetFavor } = favoriteSlice.actions;
export default favoriteSlice.reducer;
