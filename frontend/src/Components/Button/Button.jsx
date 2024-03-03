import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ btnName, isAvailable, onClick, inCart }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {isAvailable
        ? inCart
          ? "Added to cart"
          : btnName
        : "Notify when available"}
    </button>
  );
};

Button.propTypes = {
  btnName: PropTypes.string,
  isAvailable: PropTypes.bool,
  onClick: PropTypes.func,
  inCart: PropTypes.bool,
};

Button.defaultProps = {
  btnName: "Add to cart",
  isAvailable: true,
  onClick: () => {},
  inCart: false,
};
export default Button;
