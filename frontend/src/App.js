import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootRouters from "./routers/RootRouters";
import Header from "./Composition/Header/Header";
import Footer from "./Composition/Footer/Footer";
import "./styles/global/_base.scss";
import Breadcrumbs from "./Composition/Breadcrumbs/Breadcrumbs";
import { addUser, removeUser } from "./store/user/userSlice";
import { useLocation } from "react-router-dom";
import { fetchCartItems } from "./API/cartAPI";
import {
  fetchTodos,
  fetchChange,
  SetFavor,
} from "./store/favorites/favoriteSlice";
import { CreateFavorUser } from "./API/favorietesAPI";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location.pathname);

  useEffect(() => {
    const getUserOnLogin = async (token) => {
      const user = await fetch(`http://localhost:4000/api/customers/customer`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }).then((res) => res.json());
      // console.log(user);
      dispatch(addUser(user));
    };
    const token = localStorage?.getItem("token");
    if (token) {
      getUserOnLogin(token);
    } else {
      dispatch(removeUser());
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);
  const token = localStorage?.getItem("token");
  const products = localStorage.getItem("favorites");
  let parsedProducts;
  try {
    parsedProducts = JSON.parse(products) || [];
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    parsedProducts = [];
  }

  const favor = useSelector((state) => state.favorite.favorites);
  console.log(`favorfavorfavorfavorfavorfavorfavor`, favor);

  // console.log(`change appppppp`, user , products)
  // console.log(`favorfavorfavorfavorfavorfavorfavor`, favor)

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favor));
    const token = localStorage?.getItem("token");
    console.log(`in useeffect favor`, favor);

    token && dispatch(fetchChange({ user, favor }));
  }, [favor, dispatch]);
  useEffect(() => {
    if (token && user) {
      CreateFavorUser(user, parsedProducts);
      dispatch(fetchTodos(user));
    }
    // else {
    //     const favorSlice = JSON.parse(localStorage.getItem("favorites")) || []
    //     dispatch(SetFavor(favorSlice))
    // }
  }, [dispatch, token, user, products]);
  //
  //     useEffect(() => {
  //         localStorage.setItem("favorites", JSON.stringify(products))
  //         const token = localStorage?.getItem("token");
  //         token && dispatch(fetchChange(user, favor));
  //     }, [favor, dispatch]);

  return (
    <div className="app-wrapper">
      <Header />
      <Breadcrumbs />
      <main className="content-wrapper">
        <RootRouters />
      </main>
      <Footer />
    </div>
  );
}

export default App;
