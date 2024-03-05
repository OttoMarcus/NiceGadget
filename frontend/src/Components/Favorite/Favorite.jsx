import React from "react";
import Heart from "../Icons/Heart";
import Style from "./Favorite.module.scss";
import PropTypes from "prop-types";
// import { useDispatch } from "react-redux";
// import { toggleFavorite } from "../../store/favorites/favoriteSlice";

const Favorite = ({ click, some }) => {
  return (
    <div onClick={click} className={Style.favorite}>
      <Heart some={some} />
    </div>
  );
};

Favorite.propTypes = {
  click: PropTypes.func.isRequired,
  some: PropTypes.bool.isRequired,
};

export default Favorite;
