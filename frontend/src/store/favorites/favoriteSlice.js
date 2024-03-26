import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function () {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      const resultSlice = userId.slice(1, -1);

      if (token && resultSlice) {
        const response = await fetch(`/api/wishlist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            // id: user._id,
            id: resultSlice,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let ret = data.products || [];
        console.log(`fetchTodos`, ret);
        return ret;
      }
    } catch (error) {
      console.warn("Error fetching wishlist:", error);
      throw error;
    }
  }
);

export const synchronizeFavor = createAsyncThunk(
  "todos/synchronizeFavor",
  async function () {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      const favor = localStorage.getItem("favorites") || [];
      const resultSlice = userId.slice(1, -1);
      if (resultSlice && token) {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/wishlist/synchronize`, {
          method: `PUT`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            id: resultSlice,
            products: JSON.parse(favor),
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        localStorage.setItem(`favorites`, []);

        const data = await response.json();

        return data;
      }
    } catch (error) {
      console.warn("Error updating wishlist:", error);
      throw error; // Перебрасываем ошибку, чтобы ее можно было обработать в UI
    }
  }
);

export const fetchChange = createAsyncThunk(
  "todos/fetchChange",
  async function ({ user, ...products }) {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      const resultSlice = userId.slice(1, -1);
      if (token && resultSlice) {
        const response = await fetch(`/api/wishlist`, {
          method: `PUT`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ id: resultSlice, products: products.favor }),
        });
        console.log(response.ok);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        return data;
      }
    } catch (error) {
      console.warn("Error updating wishlist:", error);
      throw error;
    }
  }
);

// export const featchClearFavor = createAsyncThunk(
//   "todos/featchClearFavor",
//   async function (user) {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         const response = await fetch(`/api/wishlist`, {
//           method: `PUT`,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({ id: user._id, products: [] }),
//         });
//
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//
//         const data = await response.json();
//         return data.products;
//       }
//     } catch (error) {
//       console.warn("Error updating wishlist:", error);
//       throw error;
//     }
//   }
// );
const currentLocalInitialState = localStorage.getItem("favorites");
const parsedFavorites = currentLocalInitialState
  ? JSON.parse(currentLocalInitialState)
  : [];
const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    status: null,
    favorites: parsedFavorites,
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
      // localStorage.setItem("favorites", JSON.stringify(state.favorites));
      // const elms = JSON.parse(localStorage.getItem("favorites")) ;
      // console.log(`in slice `, state.favorites);
      // console.log(`in slice local `, elms);
    },
    SetFavor: (state, action) => {
      state.favorites = action.payload;
      // localStorage.setItem("favorites", JSON.stringify(action.payload));
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
        if (action.payload) {
          state.favorites = action.payload;
        }
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchChange.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchChange.fulfilled, (state) => {
        state.status = "resolve";
        // state.favorites = action.payload
      })
      .addCase(fetchChange.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
    // .addCase(featchClearFavor.pending, (state) => {
    //   state.status = "loading";
    //   state.error = null;
    // })
    // .addCase(featchClearFavor.fulfilled, (state, action) => {
    //   state.status = "resolve";
    //   if (action.payload?.products) {
    //     state.favorites = action.payload?.products;
    //   }
    // })
    // .addCase(featchClearFavor.rejected, (state, action) => {
    //   state.status = "rejected";
    //   state.error = action.error.message;
    // });
  },
});

export const { Tooglefavorites, SetFavor } = favoriteSlice.actions;
export default favoriteSlice.reducer;
