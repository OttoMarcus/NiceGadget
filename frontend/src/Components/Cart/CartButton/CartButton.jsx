import React from "react";
import { useSelector } from "react-redux";
import Button from "../../Button/Button";
import { useHandleAddToCart } from "../hooks/useHandleAddToCart";
import PropTypes from "prop-types";

const CartButton = ({
  productToAdd,
  fetchDetailsUrl,
  isAvailable,
  inCart,
  heightBtn,
}) => {
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const backgroundColorBtn = isAvailable && !inCart ? "#905BFF" : "#323542";
  const hoverBackgroundColorBtn = inCart ? backgroundColorBtn : "#a378ff";
  const handleAddToCart = useHandleAddToCart(isAuthorized);

  const handleClick = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!isAvailable) return;

    await handleAddToCart(productToAdd, fetchDetailsUrl);
  };

  return (
    <Button
      onClick={handleClick}
      backgroundColor={backgroundColorBtn}
      hoverBackgroundColor={hoverBackgroundColorBtn}
      height={heightBtn}
      disabled={!isAvailable}
    >
      {isAvailable ? (inCart ? "Added to Cart" : "Add to Cart") : "Notify Me"}
    </Button>
  );
};

CartButton.propTypes = {
  productToAdd: PropTypes.object,
  fetchDetailsUrl: PropTypes.string,
  isAvailable: PropTypes.bool.isRequired,
  inCart: PropTypes.bool.isRequired,
  heightBtn: PropTypes.string,
};

CartButton.defaultProps = {
  productToAdd: null,
  fetchDetailsUrl: null,
  heightBtn: "40px",
};

export default CartButton;
