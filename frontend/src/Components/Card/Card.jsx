import React from "react";

import Favorite from "../Favorite/Favorite";
import styles from "./Card.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooglefavorites } from "../../store/favorites/favoriteSlice";
import CartButton from "../CartButton/CartButton";

const Card = (props) => {
  const {
    id,
    name,
    picture,
    price,
    color,
    screen,
    capacity,
    ram,
    refModel,
    category,
  } = props;
  const dispatch = useDispatch();
  const favor = useSelector((state) => state.favorite.favorites);
  const some = favor.some((el) => id === el.id);

  const productToAdd = { ...props };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const inCart = cartItems.some((item) => item.productId === productToAdd._id);

  return (
    <Link
      to={`/${category}/${refModel.modelId}?color=${color}&capacity=${capacity}`}
      className={styles.cardLink}
    >
      <div className={styles.card}>
        <div className={styles.cardImg}>
          <img src={picture} alt="Card" />
        </div>
        <div className={styles.nameWrapper}>
          <div className={styles.model}>{name}</div>
        </div>
        <div className={styles.price}>${price}</div>
        <div className={styles.divider}></div>
        <ul className={styles.paramsGroup}>
          <li>
            <p>Screen</p>
            <p>{screen}</p>
          </li>
          <li>
            <p>Capacity</p>
            <p>{capacity}</p>
          </li>
          <li>
            <p>RAM</p>
            <p>{ram}</p>
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

Card.propTypes = {
  _id: PropTypes.string,
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string,
  color: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,

  id: PropTypes.string,
  screen: PropTypes.string,
  capacity: PropTypes.string,
  ram: PropTypes.string,
  brandNew: PropTypes.bool,
  refModel: PropTypes.shape({
    modelId: PropTypes.string,
    modelName: PropTypes.string,
  }),
};

export default Card;
