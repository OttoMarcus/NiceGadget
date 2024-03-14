import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "../../Components/Cart/Cart";
import styles from "./CartPage.module.scss";
import LeftArrow from "../../Components/Icons/LeftArrow";
import { fetchCartItems } from "../../API/cartAPI";

const CartPage = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, isAuthorized]);

  return (
    <>
      <div className={styles.cartContainer}>
        <div className={styles.backBtnWrapper}>
          <LeftArrow />
          <Link className={styles.backBtn} to="/">
            Back
          </Link>
        </div>
        <h1 className={styles.cartPageTitle}>Cart</h1>
        <Cart />
      </div>
    </>
  );
};

export default CartPage;
