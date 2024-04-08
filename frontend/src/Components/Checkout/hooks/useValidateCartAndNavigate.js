import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateCartItems } from "../../../API/cartAPI";

export const useValidateCartAndNavigate = (
  toggleModal,
  setValidationResults,
  successRedirectPath = "/checkout",
  onSuccess
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleCheckout = useCallback(
    async (values) => {
      try {
        if (!cartItems.length) {
          toggleModal(true);
          setValidationResults([{ isEmpty: true }]);
          return;
        }

        const validationResults = await dispatch(
          validateCartItems(cartItems)
        ).unwrap();

        if (validationResults.allProductsAvailable) {
          if (onSuccess) {
            onSuccess(values);
            navigate(successRedirectPath);
          } else {
            navigate(successRedirectPath);
          }
        } else {
          toggleModal(true);
          setValidationResults(validationResults.errors || []);
        }
      } catch (error) {
        console.error("Validation error:", error);
      }
    },
    [
      navigate,
      dispatch,
      cartItems,
      toggleModal,
      setValidationResults,
      successRedirectPath,
      onSuccess,
    ]
  );

  return handleCheckout;
};
