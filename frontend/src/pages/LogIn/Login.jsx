import React from "react";
import styles from "./Login.module.scss";
import UserLoginForm from "../../Components/Forms/AuthorizationForm/UserLoginForm";

const Login = () => {
  return (
    <div className={`${styles.container}${styles.loginPageWrapper}`}>
      <UserLoginForm />
    </div>
  );
};

export default Login;
