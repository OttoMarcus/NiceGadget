import React from "react";
import { Link } from "react-router-dom";
import style from "./Registration.module.scss";
import UserRegForm from "../../Components/Forms/UserRegFrom/UserRegForm";

const Registration = () => {
  return (
    <div className={style.testBox}>
      <h1 className={style.tittle}>This is Registration Page </h1>
      <Link className={style.linksBtn} to="/">
        Home
      </Link>
      <UserRegForm />
    </div>
  );
};

export default Registration;
