import React from "react";
import HeartIcon from "../Icons/HeartIcon";
import Style from "./Favorite.module.scss";
import PropTypes from "prop-types";
// import { useDispatch } from "react-redux";
// import { toggleFavorite } from "../../store/favorites/favoriteSlice";

const Favorite = ({ click, some }) => {
  return (
    <div onClick={click} className={Style.favorite}>
      <HeartIcon some={some} />
    </div>
  );
};

Favorite.propTypes = {
  click: PropTypes.func.isRequired,
  some: PropTypes.bool.isRequired,
};

export default Favorite;
