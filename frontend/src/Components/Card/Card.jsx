import React from "react";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";
import Style from "./Card.module.scss";
import PropTypes from "prop-types";

const Card = (props) => {
  const { imageSrc, model, price, screen, capacity, ram } = props;
  return (
    <div className={Style.card}>
      <div className={Style.cardImg}>
        <img src={imageSrc} alt="Card" />
      </div>
      <div className={Style.model}>{model}</div>
      <div className={Style.price}>${price}</div>
      <div className={Style.divider}></div>
      <ul className={Style.paramsGroup}>
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
      <div className={Style.buttonWrapper}>
        <Button btnName={"Add cart"} />
        <Favorite />
      </div>
    </div>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  screen: PropTypes.string,
  capacity: PropTypes.string,
  ram: PropTypes.string,
};

export default Card;
