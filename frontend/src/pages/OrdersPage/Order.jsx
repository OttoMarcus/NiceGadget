import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import style from "./Order.module.scss";

const Order = ({
  _id,
  canceled,
  customerId,
  data,
  deliveryAddress,
  email,
  letterSubject,
  mobile,
  orderNo,
  products,
  shipping,
  status,
  totalSum,
}) => {
  const [toogleOpen, settoogleOpen] = useState(null);
  const dateObject = new Date(data);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();
  const handelToogle = (orderNo) => {
    settoogleOpen(!toogleOpen);
  };
  return (
    <div className={style.container}>
      <div className={style.containerOrder}>
        <div className={style.infoSection}>
          {/*<div className={style.infoWrapper}>*/}
          {/* */}
          {/*</div>*/}
          {/*<div className={style.infoWrapper}>*/}
          {/* */}
          {/*</div>*/}
          {/*<div className={style.infoWrapper}>*/}

          {/*</div>*/}
          <div className={style.infoWrapper}>
            <p className={style.info}>Order number:</p>
            <p className={style.subInfo}>{orderNo}</p>
            <p className={style.info}>Delivery address:</p>
            <p className={style.subInfo}> {deliveryAddress}</p>
            {/*<p className={style.info}>Total sum: {totalSum}$</p>*/}
            <p className={style.info}>Shipping: {shipping?.method}</p>
            <p className={style.info}>Status: {status}</p>
            <p className={style.info}>Email: {email}</p>
            <p className={style.info}>Mobile: {mobile}</p>
            <p className={style.info}>
              Date: {day}.{month}.{year}
            </p>
            <p className={style.info}>
              Time: {hours}:{minutes}{" "}
            </p>
          </div>
          <div className={style.price}>
            <h2>Total price: </h2>
            <p>{totalSum} $</p>
          </div>
          <p
            className={style.toogleProducts}
            onClick={() => handelToogle(orderNo)}
          >
            {toogleOpen ? `close all products` : `open all products`}
          </p>
        </div>
        {toogleOpen && (
          <div className={style.pictureSection}>
            {products.map((product) => {
              const discountedPrice = product.discount
                ? Math.round(product.price - product.price * product.discount)
                : product.price;
              const percentDiscount = product.discount
                ? product.discount * 100
                : 0;

              return (
                <div key={product.productId} className={style.product}>
                  <img
                    className={style.img}
                    src={product.picture}
                    alt={product.name}
                  />
                  <div className={style.subInfoWrapper}>
                    <p className={style.info}>Name:</p>
                    <p className={`${style.subInfo}`}>{product.name}</p>

                    <p className={style.info}>Price:</p>
                    <p className={style.subInfo}>
                      {discountedPrice}${" "}
                      {product.discount > 0 && (
                        <span className={style.discount}>
                          {" "}
                          (-{percentDiscount}%)
                        </span>
                      )}
                    </p>
                    <p className={style.info}>Amount:</p>
                    <p className={style.subInfo}>1</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

Order.propTypes = {
  _id: PropTypes.string.isRequired,
  canceled: PropTypes.bool.isRequired,
  customerId: PropTypes.any,
  data: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  letterSubject: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  orderNo: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  shipping: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  totalSum: PropTypes.number.isRequired,
};

export default Order;
