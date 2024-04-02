import React from "react";
import Button from "../../Button/Button";
import { useValidateCartAndNavigate } from "../hooks/useValidateCartAndNavigate";
import PropTypes from "prop-types";

const CheckoutButton = ({ setModalOpen, setValidationResults }) => {
  const validateAndNavigate = useValidateCartAndNavigate(
    setModalOpen,
    setValidationResults
  );

  return (
    <Button onClick={validateAndNavigate} type="button" height="48px">
      Checkout
    </Button>
  );
};

CheckoutButton.propTypes = {
  setModalOpen: PropTypes.func,
  setValidationResults: PropTypes.func,
};

CheckoutButton.defaultProps = {
  setModalOpen: () => {},
  setValidationResults: () => {},
};

export default CheckoutButton;
