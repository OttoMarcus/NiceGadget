import React from "react";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";
import styles from "./Card.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Tooglefavorites,
  fetchChange,
} from "../../store/favorites/favoriteSlice";
import { addToCartLocal } from "../../store/cart/cartSlice";
import { addToCartServer } from "../../API/cartAPI";

const Card = (props) => {
  const {
    _id,
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
    available,
  } = props;
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const favor = useSelector((state) => state.favorite.favorites);
  const some = favor.some((el) => id === el.id);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const inCart = cartItems.some((item) => item.productId === _id);
  const isAvailable = available;
  const backgroundColorBtn = isAvailable && !inCart ? "#905BFF" : "#323542";

  const handleAddToCart = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const productToAdd = { ...props };

    if (isAuthorized) {
      dispatch(addToCartServer(productToAdd));
    } else {
      dispatch(addToCartLocal({ productToAdd }));
    }
  };
  //   const favorfunc = (event) => {
  //     event.stopPropagation();
  //     event.preventDefault();
  //     if (isAuthorized) {
  // dispatch(fetchChange(props))
  //     } else {
  //       dispatch(Tooglefavorites(props));
  //     }
  //   };

  return (
    <Link
      to={`/${category}/${refModel.modelId}?color=${color}&capacity=${capacity}`}
    >
      <div className={styles.card}>
        <div className={styles.cardImg}>
          <img src={picture} alt="Card" />
        </div>
        <div className={styles.model}>{name}</div>
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
          <Button
            onClick={(event) => handleAddToCart(event)}
            backgroundColor={backgroundColorBtn}
          >
            {isAvailable
              ? inCart
                ? "Added to cart"
                : "Add to cart"
              : "Notify when available"}
          </Button>

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
