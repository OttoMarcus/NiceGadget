import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateCartItems } from "../../../API/cartAPI";

export const useValidateCartAndNavigate = (
  setModalOpen,
  setValidationResults
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleCheckout = useCallback(async () => {
    try {
      const validationResults = await dispatch(
        validateCartItems(cartItems)
      ).unwrap();

      if (validationResults.allProductsAvailable) {
        navigate("/checkout");
      } else {
        setModalOpen(true);
        setValidationResults(validationResults.errors || []);
      }
    } catch (error) {
      console.error("Помилка валідації:", error);
    }
  }, [navigate, dispatch, cartItems, setModalOpen, setValidationResults]);

  return handleCheckout;
};
