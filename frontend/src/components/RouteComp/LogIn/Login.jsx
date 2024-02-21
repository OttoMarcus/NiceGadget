import React from "react";
import { Link } from "react-router-dom";
import Style from "./Login.module.scss";

const Login = () => {
  return (
    <div className={Style.testBox}>
      <h1 className={Style.tittle}>This is Login Page </h1>
      <Link className={Style.linksBtn} to="/">
        Home
      </Link>
    </div>
  );
};

export default Login;
