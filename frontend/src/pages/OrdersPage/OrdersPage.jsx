import React from "react";
import { useSelector } from "react-redux";
import Order from "../../Components/Order/Order";
import styles from "./OrdersPage.module.scss";

const OrdersPage = () => {
  const orders = useSelector((state) => state.OrderNew.orders);
  if (!Array.isArray(orders)) {
    return null;
  }
  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.headTittle}>Orders Page</h1>
      {orders.length >= 1 &&
        orders.map((el, index) => {
          return <Order key={index} {...el} />;
        })}
    </div>
  );
};

export default OrdersPage;
