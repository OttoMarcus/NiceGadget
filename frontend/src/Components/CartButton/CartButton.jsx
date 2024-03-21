import React from "react";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import { useHandleAddToCart } from "../Cart/hooks/useHandleAddToCart";
import PropTypes from "prop-types";

const CartButton = ({ productToAdd, fetchDetailsUrl, isAvailable, inCart }) => {
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const backgroundColorBtn = isAvailable && !inCart ? "#905BFF" : "#323542";
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
      disabled={!isAvailable}
    >
      {isAvailable
        ? inCart
          ? "Added to cart"
          : "Add to cart"
        : "Notify when available"}
    </Button>
  );
};

CartButton.propTypes = {
  productToAdd: PropTypes.object,
  fetchDetailsUrl: PropTypes.string,
  isAvailable: PropTypes.bool.isRequired,
  inCart: PropTypes.bool.isRequired,
};

CartButton.defaultProps = {
  productToAdd: null,
  fetchDetailsUrl: null,
};

export default CartButton;
