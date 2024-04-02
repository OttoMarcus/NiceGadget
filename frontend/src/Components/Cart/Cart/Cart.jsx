import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import CartItem from "../CartItem/CartItem";
import CheckoutButton from "../../Checkout/CheckoutButton/CheckoutButton";
import CheckoutModal from "../../Checkout/CheckoutModal/CheckoutModal";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const calculateTotalItemPrice = (price, discount = 0, quantity) => {
    return Math.round(price * (1 - discount) * quantity);
  };

  const totalCartPrice = cartItems.reduce(
    (total, item) =>
      total +
      calculateTotalItemPrice(item.price, item.discount, item.cartQuantity),
    0
  );

  const totalItemsQuantity = cartItems.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationResults, setValidationResults] = useState([]);

  const validationResultsWithDetails = validationResults.map(
    (validationResult) => {
      const product = cartItems.find(
        (item) => item.customId === validationResult.customId
      );

      return {
        ...validationResult,
        name: product ? product.name : "Невідомий продукт",
        cartQuantity: product ? product.cartQuantity : 0,
      };
    }
  );

  return (
    <div className={styles.cart}>
      {cartItems.length === 0 && (
        <p className={styles.emptyMessage}>Your cart is empty</p>
      )}

      {cartItems.length > 0 && (
        <>
          <div className={styles.cartItemsList}>
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div className={styles.checkoutSection}>
            <div className={styles.totalPriceWarapper}>
              <p className={styles.totalCartPrice}>{`$${totalCartPrice}`}</p>
              <p
                className={styles.totalItemsQuantity}
              >{`Total for ${totalItemsQuantity} items`}</p>
            </div>
            <div className={styles.divider}></div>
            <CheckoutButton
              setModalOpen={setIsModalOpen}
              setValidationResults={setValidationResults}
            />
            {isModalOpen && (
              <CheckoutModal
                close={() => setIsModalOpen(false)}
                validationResults={validationResultsWithDetails}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
