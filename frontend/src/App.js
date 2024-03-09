import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import RootRouters from "./routers/RootRouters";
import Header from "./Composition/Header/Header";
import Footer from "./Composition/Footer/Footer";
import "./styles/global/_base.scss";
import Breadcrumbs from "./Composition/Breadcrumbs/Breadcrumbs";
import { addUser, removeUser } from "./store/user/userSlice";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location.pathname);

  const getUserOnLogin = async (token) => {
    const user = await fetch(`http://localhost:4000/api/customers/customer`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }).then((res) => res.json());
    console.log(user);
    dispatch(addUser(user));
  };

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      getUserOnLogin(token);
    } else {
      dispatch(removeUser());
    }
  }, [location.pathname, dispatch, getUserOnLogin]);

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      getUserOnLogin(token);
    } else {
      dispatch(removeUser());
    }
  }, [location.pathname, dispatch, getUserOnLogin]);

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
