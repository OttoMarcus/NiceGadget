import React, { useEffect, useState } from "react";
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
  featchClearFavor,
} from "./store/favorites/favoriteSlice";

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
  //location.pathname, dispatch

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);

  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const token = localStorage?.getItem("token");
  const favor = useSelector((state) => state.favorite.favorites);
  useEffect(() => {
    token &&
      setTimeout(() => {
        dispatch(fetchTodos(user, isAuthorized));
      }, 100);
  }, [dispatch, token, user, isAuthorized]);
  useEffect(() => {
    user && dispatch(fetchChange({ user, favor }));
    user && favor.length === 0 && dispatch(featchClearFavor(user));
    !token && localStorage.setItem("favorites", JSON.stringify(favor));
  }, [favor]);
  // console.log(`User new ` , User)
  // const isAuthorized = useSelector((state) => state.user.isAuthorized);
  // const token = localStorage?.getItem("token");
  // const products = localStorage.getItem("favorites");
  // // let parsedProducts = [];
  // // try {
  // //   parsedProducts = JSON.parse(products) || [];
  // // } catch (error) {
  // //   console.log("Error parsing JSON from localStorage:", error);
  // //   parsedProducts = [];
  // // }
  //
  // const favor = useSelector((state) => state.favorite.favorites);
  // // console.log(`favorfavorfavorfavorfavorfavorfavor`, favor);
  // // useEffect(() => {
  // //   // user && dispatch(fetchChange({ user, favor }));
  // //   // favor.length === 0 && dispatch(featchClearFavor(user));
  // //   //  favor.length === 0 && localStorage.setItem("favorites", JSON.stringify([]));
  // //   //   localStorage.setItem("favorites", JSON.stringify(favor));
  // //   console.log(`set favor in useEffect`, favor)
  // // }, [favor]);
  // useEffect(() => {
  //   user && dispatch(fetchChange({ user, favor }));
  // }, [favor]);
  // useEffect(() => {
  //   favor.length === 0 && dispatch(featchClearFavor(user));
  //   favor.length === 0 && localStorage.setItem("favorites", JSON.stringify([]));
  // }, [favor]);
  // useEffect(() => {
  //   // console.log(`ebaniy set favor`, favor);
  //   setTimeout(() => {
  //     // console.log(`ebaniy set favor 2`, favor);
  //     localStorage.setItem("favorites", JSON.stringify(favor));
  //   }, 1);
  //
  //   console.log(`user`, user);
  // }, [favor]);
  // useEffect(() => {
  //   if (token && user) {
  //     //  user && CreateFavorUser(user, parsedProducts);
  //     // user && dispatch(fetchTodos(user, isAuthorized));
  //   }
  // }, [favor]);
  // useEffect(() => {
  //   if (token && user) {
  //     // user && CreateFavorUser(user, parsedProducts);
  //
  //     setTimeout(() => {
  //       // console.log(`ret in effectn user`, user);
  //       dispatch(fetchTodos(user, isAuthorized));
  //     }, 100);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (token && user) {
  //     user && CreateFavorUser(user, parsedProducts);
  //     user && dispatch(fetchTodos(user, isAuthorized));
  //   } else {
  //     const favorSlice = JSON.parse(localStorage.getItem("favorites")) || [];
  //     // dispatch(SetFavor(favorSlice));
  //     // localStorage.setItem("favorites", JSON.stringify(favor));
  //   }
  // }, [favor]);

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
