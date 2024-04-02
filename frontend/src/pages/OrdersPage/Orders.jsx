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
  console.log(orders);
  return (
    <div className={styles.ordersContainer}>
      <h1 className={style.headTittle}>Orders Page</h1>
      {orders.length >= 1 &&
        orders.map((el, index) => {
          return (
            <Order key={index} {...el} />
            // <div key={el.orderNo} className={styles.orderItem}>
            //   <div>
            //     <p>Order No: {el.orderNo}</p>
            //     <div className={styles.productList}>
            //
            //       {/*{el.products.map((elem, index) => {*/}
            //       {/*          return (*/}
            //       {/*              <div key={index} className={styles.productItem}>*/}
            //       {/*      <div className={styles.productImage}>*/}
            //       {/*        <img src={elem.picture} alt={elem.name} />*/}
            //       {/*      </div>*/}
            //       {/*      <p className={styles.productName}>{elem.name}</p>*/}
            //       {/*      <p className={styles.productDetails}>*/}
            //       {/*        Price: ${elem.price}*/}
            //       {/*      </p>*/}
            //       {/*      <p className={styles.productDetails}>*/}
            //       {/*        Quantity: {elem.cartQuantity}*/}
            //       {/*      </p>*/}
            //       {/*      <p className={styles.productDetails}>*/}
            //       {/*        Total: ${(elem.price * elem.cartQuantity).toFixed(2)}*/}
            //       {/*      </p>*/}
            //       {/*    </div>*/}
            //       {/*  );*/}
            //       {/*})}*/}
            //     </div>
            //   </div>
            //   <p>Delivery Address: {el.deliveryAddress}</p>
            //   <p>Shipping Method: {el.shipping.method}</p>
            //   <p>Total Sum: {el.totalSum}$</p>
            //   <p>Status: {el.shipping.status}</p>
            // </div>
          );
        })}
    </div>
  );
};

export default Orders;
