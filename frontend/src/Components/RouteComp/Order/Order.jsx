import React from "react";
import { Link } from "react-router-dom";
import Style from "./Order.module.scss";

const Order = () => {
  return (
    <div className={Style.testBox}>
      <h1 className={Style.tittle}>This is Order Page </h1>
      <Link className={Style.linksBtn} to="/">
        Home
      </Link>
    </div>
  );
};

export default Order;
