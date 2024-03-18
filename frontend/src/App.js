import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import RootRouters from "./routers/RootRouters";
import Header from "./Composition/Header/Header";
import Footer from "./Composition/Footer/Footer";
import "./styles/global/_base.scss";
import Breadcrumbs from "./Composition/Breadcrumbs/Breadcrumbs";
import { addUser, removeUser } from "./store/user/userSlice";
import { useLocation } from "react-router-dom";
import { fetchCartItems } from "./API/cartAPI";

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
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

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
