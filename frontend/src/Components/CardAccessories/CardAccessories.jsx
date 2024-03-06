import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Style from "./CardAccessories.module.scss";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { Tooglefavorites } from "../../store/favorites/favoriteSlice";
import { addToCart } from "../../store/cart/cartSlice";

const CardAccessories = (props) => {
  const { category, name, color, price, picture, size, weight, id, available } =
    props;
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

CardAccessories.propTypes = {
  category: PropTypes.string.isRequired,
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
