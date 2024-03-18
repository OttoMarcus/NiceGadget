import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import UserLoginForm from "../../Components/Forms/AuthorizationForm/UserLoginForm";

const Login = () => {
  return (
    <div className={`${styles.container}${styles.loginPageWrapper}`}>
      {/* <h1 className={Style.tittle}>This is Login Page </h1>
      <Link className={Style.linksBtn} to="/">
        Home
      </Link> */}
      <UserLoginForm />
    </div>
  );
};

export default Login;
