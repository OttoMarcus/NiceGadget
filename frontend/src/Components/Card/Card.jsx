import React from "react";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";
import styles from "./Card.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooglefavorites } from "../../store/favorites/favoriteSlice";
import { addToCart } from "../../store/cart/cartSlice";

const Card = (props) => {
  const {
    id,
    picture,
    name,
    price,
    screen,
    capacity,
    ram,
    refModel,
    color,
    category,
    available,
  } = props;
  const dispatch = useDispatch();
  const favor = useSelector((state) => state.favorite.favorites);
  const some = favor.some((el) => id === el.id);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const inCart = cartItems.some((item) => item.id === id);
  const isAvailable = available;
  const backgroundColorBtn = isAvailable && !inCart ? "#905BFF" : "#323542";

  const handleAddToCart = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (id) {
      const productDetailsUrl = `http://localhost:4000/api/${category}/${id}`;

      fetch(productDetailsUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((productDetails) => {
          dispatch(
            addToCart({
              ...productDetails,
            })
          );
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    } else {
      console.error("Product ID is missing");
    }
  };

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
  id: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  screen: PropTypes.string,
  capacity: PropTypes.string,
  ram: PropTypes.string,
  brandNew: PropTypes.bool,
  refModel: PropTypes.shape({
    modelId: PropTypes.string.isRequired,
    modelName: PropTypes.string.isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
  category: PropTypes.string,
};

export default Card;
