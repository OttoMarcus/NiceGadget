import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.scss";
import CartItem from "../CartItem/CartItem";
import Button from "../Button/Button";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const navigate = useNavigate();

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

  const handleCheckout = () => {
    if (isAuthorized) {
      navigate("/buyform"); // Зареєстрований користувач
    } else {
      navigate("/login"); // Неавторизований користувач
    }
  };

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
            <Button
              onClick={handleCheckout}
              type="button"
              className={styles.checkoutBtn}
              height="48px"
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
