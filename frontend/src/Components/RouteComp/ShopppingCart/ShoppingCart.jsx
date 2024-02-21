import React from "react";
import { Link } from "react-router-dom";
import Style from "./ShoppingCart.module.scss";

const ShoppingCart = () => {
  return (
    <div className={Style.testBox}>
      <h1 className={Style.tittle}>This is ShoppingCart Page </h1>
      <Link className={Style.linksBtn} to="/">
        Home
      </Link>
    </div>
  );
};

export default ShoppingCart;
