import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import { fetchCartItems } from "../../store/cart/cartSlice";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  console.log(cartItems);

  useEffect(() => {
    dispatch(fetchCartItems()).catch((error) =>
      console.error("Failed to fetch cart items:", error)
    );
  }, [dispatch]);

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.totalItemPrice,
    0
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
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className={styles.checkoutSection}>
            <div className={styles.totalPriceWarapper}>
              <p className={styles.totalCartPrice}>{`$${totalCartPrice}`}</p>
              <p
                className={styles.totalItemsQuantity}
              >{`Total for ${cartItems.length} items`}</p>
            </div>
            <button className={styles.checkoutBtn}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
