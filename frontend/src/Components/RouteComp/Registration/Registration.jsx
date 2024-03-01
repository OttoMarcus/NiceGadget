import React from "react";
import { Link } from "react-router-dom";
import Style from "./Registration.module.scss";
import UserRegForm from "../../Forms/UserRegFrom/UserRegForm";

const Registration = () => {
  return (
    <div className={Style.testBox}>
      <h1 className={Style.tittle}>This is Registration Page </h1>
      <Link className={Style.linksBtn} to="/">
        Home
      </Link>
      <UserRegForm />
    </div>
  );
};

export default Registration;
