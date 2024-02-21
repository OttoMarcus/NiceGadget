import React from "react";
import { Link } from "react-router-dom";
import Style from "./Accessories.module.scss";

const Accessories = () => {
  return (
    <div className={Style.testBox}>
      <h1 className={Style.tittle}>This is Accessories Page </h1>
      <Link className={Style.linksBtn} to="/">
        Home
      </Link>
    </div>
  );
};

export default Accessories;
