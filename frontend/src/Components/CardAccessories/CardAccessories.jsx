import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./CardAccessories.module.scss";
import Favorite from "../Favorite/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { Tooglefavorites } from "../../store/favorites/favoriteSlice";
import CartButton from "../CartButton/CartButton";

const CardAccessories = (props) => {
  const { id, name, picture, price, color, size, weight, category } = props;
  const dispatch = useDispatch();

  const favor = useSelector((state) => state.favorite.favorites);
  const some = favor.some((el) => id === el.id);

  const productToAdd = { ...props };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const inCart = cartItems.some((item) => item.productId === productToAdd._id);

  return (
    <Link to={`/${category}/${name}?color=${color}`}>
      <div className={styles.card}>
        <div className={styles.cardImg}>
          <img src={picture} alt="Card" />
        </div>
        <div className={styles.model}>{name}</div>
        <div className={styles.price}>${price}</div>
        <div className={styles.divider}></div>
        <ul className={styles.paramsGroup}>
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
        <div className={styles.buttonWrapper}>
          <CartButton
            productToAdd={productToAdd}
            isAvailable={productToAdd?.available}
            inCart={inCart}
            fetchDetailsUrl={null}
          />

          <Favorite
            click={(event) => {
              event.stopPropagation();
              event.preventDefault();
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
  _id: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
};

export default CardAccessories;
