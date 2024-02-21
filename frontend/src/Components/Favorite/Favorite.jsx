import React from "react";
import Heart from "../Icons/Heart";
import Style from "./Favorite.module.scss";

const Favorite = () => {
  return (
    <div className={Style.favorite}>
      <Heart />
    </div>
  );
};

export default Favorite;
