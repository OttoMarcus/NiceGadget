import React from "react";
import { useSelector } from "react-redux";
import styles from "./Orders.module.scss";
import Order from "./Order";
import style from "./Order.module.scss";
import stylesBack from "../CartPage/CartPage.module.scss";
import LeftArrowIcon from "../../Components/Icons/LeftArrowIcon";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const orders = useSelector((state) => state.OrderNew.orders);
  const navigate = useNavigate();

  const handleBack = () => {
    const prevPath = sessionStorage.getItem("prevPath") || "/";
    if (
      prevPath === "/cart" ||
      prevPath === "/login" ||
      prevPath === "/registration"
    ) {
      navigate("/");
    } else {
      navigate(prevPath);
    }
  };

  if (!Array.isArray(orders)) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={stylesBack.backBtnWrapper} onClick={handleBack}>
        <LeftArrowIcon />
        <span className={stylesBack.backBtn}>Back</span>
      </div>

      <div className={styles.ordersContainer}>
        <h1 className={style.headTittle}>Orders Page</h1>
        {orders.length >= 1 &&
          orders.map((el, index) => {
            return <Order key={index} {...el} />;
          })}
      </div>
    </div>
  );
};

export default Orders;
