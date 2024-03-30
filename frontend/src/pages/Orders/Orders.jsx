import React from "react";
import style from "./Orders.module.scss";

const Orders = () => {
  return (
    <div className={style.container}>
      <h1 className={style.headTittle}>Orders Page</h1>
      <div className={style.containerOrder}>
        <div className={style.infoSection}>
          <div className={style.infoWrapper}>
            <p className={style.info}>Order number:</p>
            <p className={style.subInfo}>0200331</p>
          </div>
          <div className={style.infoWrapper}>
            <p className={style.info}>Delivery address:</p>
            <p className={style.subInfo}>
              New york , Platinum st. 98 , office 121
            </p>
          </div>
          <div className={style.infoWrapper}>
            <p className={style.info}>Shipping:</p>
            <p className={style.subInfo}>Express </p>
            <p className={style.info}>Cost:</p>
            <p className={style.subInfo}>5.99$ </p>
          </div>
          <div className={style.infoWrapper}>
            <p className={style.info}>Payment info:</p>
            <p className={style.subInfo}>Credit Card </p>
            <p className={style.info}>Card number:</p>
            <p className={style.subInfo}>**** **** **** 0149 </p>
            <p className={style.info}>Expiration Date:</p>
            <p className={style.subInfo}>12/24</p>
          </div>
          <div className={style.infoWrapper}>
            <p className={style.info}>Total sum:</p>
            <p className={style.subInfo}>49.99$</p>
            <p className={style.info}>Status:</p>
            <p className={style.subInfo}>Pending</p>
            <p className={style.info}>Email:</p>
            <p className={style.subInfo}>noskiDjeltelmenu@gmail.com</p>
            <p className={style.info}>Mobile:</p>
            <p className={style.subInfo}>+380995568778</p>
            <p className={style.info}>Date:</p>
            <p className={style.subInfo}>08/14/2024</p>
          </div>
        </div>
        <div className={style.pictureSection}>
          <div className={style.product}>
            <img
              className={style.img}
              src="https://res.cloudinary.com/de71eui6p/image/upload/v1708427986/iPhone%2015%20Pro%20Max/Black/fxinp2nmy6sxk6ehz6wu.webp"
              alt="phone"
            />
            <div className={style.subInfoWrapper}>
              <p className={style.info}>Name:</p>
              <p className={style.subInfo}>iPhone 15 Pro Max Black</p>
              <p className={style.info}>Price:</p>
              <p className={style.subInfo}>1899$</p>
              <p className={style.info}>Amount:</p>
              <p className={style.subInfo}>1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
