import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Style from "./CardAccessories.module.scss";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { Tooglefavorites } from "../../store/favorites/favoriteSlice";

const CardAccessories = (props) => {
  const { name, color, price, picture, size, weight, id } = props;
  const dispatch = useDispatch();
  const favor = useSelector((state) => state.favorite.favorites);
  const some = favor.some((el) => id === el.id);
  return (
    <Link to={`/accessories/${name}?color=${color}`}>
      <div className={Style.card}>
        <div className={Style.cardImg}>
          <img src={picture} alt="Card" />
        </div>
        <div className={Style.model}>{name}</div>
        <div className={Style.price}>${price}</div>
        <div className={Style.divider}></div>
        <ul className={Style.paramsGroup}>
          <li>
            <p>Size:</p>
            <p>{size}</p>
          </li>
          <li>
            <p>Color:</p>
            <p>{color}</p>
          </li>
          <li>
            <p>Weight:</p>
            <p>{weight}</p>
          </li>
        </ul>
        <div className={Style.buttonWrapper}>
          <Button btnName={"Add cart"} />
          <Favorite
            click={() => {
              dispatch(Tooglefavorites(props));
            }}
            some={some}
          />
        </div>
      </div>
    </Link>
  );
};

CardAccessories.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardAccessories;
