import React, { useEffect, useRef } from "react";
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
  featchClearFavor,
} from "./store/favorites/favoriteSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname); // Використовуємо useRef для збереження попереднього шляху
  // console.log(location.pathname);

  useEffect(() => {
    const getUserOnLogin = async (token) => {
      const user = await fetch(`http://localhost:4000/api/customers/customer`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }).then((res) => res.json());

      dispatch(addUser(user));
    };

    const token = localStorage?.getItem("token");

    if (token) {
      getUserOnLogin(token);
    } else {
      dispatch(removeUser());
      //  dispatch(SetFavor([]));
      // localStorage.removeItem(`user`);
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = location.pathname;
      const prevPath = prevPathRef.current;

      if (!["/login", "/registration"].includes(currentPath)) {
        sessionStorage.setItem("prevPath", prevPath);
      }

      // Оновлюємо ref на поточний шлях після збереження prevPath
      prevPathRef.current = currentPath;
    };

    handleRouteChange();
  }, [location.pathname]);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const token = localStorage?.getItem("token");
  const products = localStorage.getItem("favorites");
  // let parsedProducts = [];
  // try {
  //   parsedProducts = JSON.parse(products) || [];
  // } catch (error) {
  //   console.log("Error parsing JSON from localStorage:", error);
  //   parsedProducts = [];
  // }
  const favor = useSelector((state) => state.favorite.favorites);
  console.log(` APP APP  favorfavorfavorfavorfavorfavorfavor`, favor);
  // useEffect(() => {
  //   // user && dispatch(fetchChange({ user, favor }));
  //   // favor.length === 0 && dispatch(featchClearFavor(user));
  //   //  favor.length === 0 && localStorage.setItem("favorites", JSON.stringify(
  //   //   localStorage.setItem("favorites", JSON.stringify(favor));
  //   console.log(`set favor in useEffect`, favor)
  // }, [favor]);
  console.log(`isAuthorized`, isAuthorized);
  console.log(`єта сука должна работатьт1`);
  useEffect(() => {
    console.log(`pizdech blyt`);
  }, []);
  useEffect(() => {
    // if (isAuthorized) {
    // user && CreateFavorUser(user, parsedProducts);
    console.log(`єта сука должна работатьт`);
    dispatch(fetchTodos(user, isAuthorized));
    // setTimeout(() => {
    //   // console.log(`ret in effectn user`, user);
    //
    //   dispatch(fetchTodos(user, isAuthorized));
    // }, 100);
    // }
  }, [dispatch, token, user, isAuthorized]);
  useEffect(() => {
    user && dispatch(fetchChange({ user, favor }));
  }, [favor]);
  useEffect(() => {
    user && favor.length === 0 && dispatch(featchClearFavor(user));
    !token && console.log(`nety tokena `);
    // !token && favor.length === 0 && localStorage.setItem("favorites", JSON.stringify([]));
  }, [favor]);
  useEffect(() => {
    // console.log(`ebaniy set favor`, favor);
    !token && localStorage.setItem("favorites", JSON.stringify(favor));
    console.log(`!user `, user);
  }, [favor]);
  //   const token = localStorage?.getItem("token");
  //     if (token) {
  //       getUserOnLogin(token);
  //     } else {
  //       dispatch(removeUser());
  //       // dispatch(SetFavor([]));
  //       localStorage.removeItem(`user`);
  //     }
  //   }, [location.pathname, dispatch]);
  //   //location.pathname, dispatch
  //
  //   useEffect(() => {
  //     dispatch(fetchCartItems());
  //   }, [dispatch]);
  //
  //   const user = useSelector((state) => state.user.user);
  //   useEffect(() => {
  //     SetUser(user);
  //   }, []);
  //
  //   // console.log(`User new ` , User)
  //   const isAuthorized = useSelector((state) => state.user.isAuthorized);
  //   const token = localStorage?.getItem("token");
  //   const products = localStorage.getItem("favorites");
  //   // let parsedProducts = [];
  //   // try {
  //   //   parsedProducts = JSON.parse(products) || [];
  //   // } catch (error) {
  //   //   console.log("Error parsing JSON from localStorage:", error);
  //   //   parsedProducts = [];
  //   // }
  //
  //   const favor = useSelector((state) => state.favorite.favorites);
  //   console.log(` APP APP  favorfavorfavorfavorfavorfavorfavor`, favor);
  //   // useEffect(() => {
  //   //   // user && dispatch(fetchChange({ user, favor }));
  //   //   // favor.length === 0 && dispatch(featchClearFavor(user));
  //   //   //  favor.length === 0 && localStorage.setItem("favorites", JSON.stringify([]));
  //   //   //   localStorage.setItem("favorites", JSON.stringify(favor));
  //   //   console.log(`set favor in useEffect`, favor)
  //   // }, [favor]);
  //   console.log(`isAuthorized`, isAuthorized);
  //   console.log(`єта сука должна работатьт1`);
  //   useEffect(() => {
  //     console.log(`pizdech blyt`);
  //   }, []);
  //   useEffect(() => {
  //     // if (isAuthorized) {
  //
  //     // user && CreateFavorUser(user, parsedProducts);
  //     console.log(`єта сука должна работатьт`);
  //     dispatch(fetchTodos(user, isAuthorized));
  //     // setTimeout(() => {
  //     //   // console.log(`ret in effectn user`, user);
  //     //
  //     //   dispatch(fetchTodos(user, isAuthorized));
  //     // }, 100);
  //     // }
  //   }, [dispatch, token, user, isAuthorized]);
  //   useEffect(() => {
  //     user && dispatch(fetchChange({ user, favor }));
  //   }, [favor]);
  //   useEffect(() => {
  //     user && favor.length === 0 && dispatch(featchClearFavor(user));
  //     !token && console.log(`nety tokena `);
  //     !token &&
  //       favor.length === 0 &&
  //       localStorage.setItem("favorites", JSON.stringify([]));
  //   }, [favor]);
  //   useEffect(() => {
  //     // console.log(`ebaniy set favor`, favor);
  //
  //     !token && localStorage.setItem("favorites", JSON.stringify(favor));
  //     console.log(`!user `, user);
  //   }, [favor]);
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
