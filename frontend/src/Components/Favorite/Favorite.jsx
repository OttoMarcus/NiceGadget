import React from "react";
import Heart from "../Icons/Heart";
import Style from "./Favorite.module.scss";
import PropTypes from "prop-types";
// import { useDispatch } from "react-redux";
// import { toggleFavorite } from "../../store/favorites/favoriteSlice";

const Favorite = ({ click }) => {
  // const dispatch = useDispatch();

  // const handleFavorite = (event, id) => {
  //   event.preventDefault();
  //   dispatch(toggleFavorite(id));
  // };

  return (
    <div onClick={click} className={Style.favorite}>
      <Heart />
    </div>
  );
};

Favorite.propTypes = {
  click: PropTypes.func.isRequired,
};

export default Favorite;
