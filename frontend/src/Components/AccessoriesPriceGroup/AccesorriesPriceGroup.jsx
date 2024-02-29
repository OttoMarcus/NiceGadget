import React from "react";
import PropTypes from "prop-types";
import styles from "./AccesorriesPriceGroup.module.scss";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";

const AccessoriesPriceGroup = ({ price }) => {
  return (
    <div className={styles.container}>
      <div className={styles.price}>${price}</div>
      <div className={styles.buttonsWrapper}>
        <Button />
        <Favorite />
      </div>
    </div>
  );
};

AccessoriesPriceGroup.propTypes = {
  price: PropTypes.string.isRequired,
};

export default AccessoriesPriceGroup;
