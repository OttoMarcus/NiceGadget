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
import { fetchTodos, fetchChange } from "./store/favorites/favoriteSlice";

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
      // dispatch(SetFavor([]));
      localStorage.removeItem(`user`);
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
      prevPathRef.current = currentPath;
    };

    handleRouteChange();
  }, [location.pathname]);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const token = localStorage?.getItem("token");
  const products = localStorage.getItem("favorites");
  const favor = useSelector((state) => state.favorite.favorites);
  useEffect(() => {
    token &&
      setTimeout(() => {
        dispatch(fetchTodos(user, isAuthorized));
      }, 100);
  }, [dispatch, token, user, isAuthorized]);
  useEffect(() => {
    user && dispatch(fetchChange({ user, favor }));
    !token && localStorage.setItem("favorites", JSON.stringify(favor));
  }, [favor, dispatch, token, user]);
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
