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
import { fetchTodos, fetchChange } from "./store/favorites/favoriteSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

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
    const effect = () => {
      token && dispatch(fetchChange({ user, favor }));
      !token && localStorage.setItem("favorites", JSON.stringify(favor));
    };
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favor, dispatch]);
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
