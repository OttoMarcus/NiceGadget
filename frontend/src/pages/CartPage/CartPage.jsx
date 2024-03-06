import React from "react";
import { Link } from "react-router-dom";
import Cart from "../../Components/Cart/Cart";
import styles from "./CartPage.module.scss";
import LeftArrow from "../../Components/Icons/LeftArrow";

const CartPage = () => {
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
