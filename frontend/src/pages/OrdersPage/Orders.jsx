import React from "react";
import { useSelector } from "react-redux";
import styles from "./Orders.module.scss";
import Order from "./Order";
import style from "./Order.module.scss";
const Orders = () => {
  const orders = useSelector((state) => state.OrderNew.orders);
  if (!Array.isArray(orders)) {
    return null;
  }
  return (
    <div className={styles.ordersContainer}>
      <h1 className={style.headTittle}>Orders Page</h1>
      {orders.length >= 1 &&
        orders.map((el, index) => {
          return <Order key={index} {...el} />;
        })}
    </div>
  );
};

export default Orders;
