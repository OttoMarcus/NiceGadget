import React from "react";
import { Link } from "react-router-dom";
import Style from "./Favorites.module.scss";

const Favorites = () => {
  return (
    <div className={Style.testBox}>
      <h1 className={Style.tittle}>This is Favorites Page </h1>
      <Link className={Style.linksBtn} to="/">
        Home
      </Link>
    </div>
  );
};

export default Favorites;
