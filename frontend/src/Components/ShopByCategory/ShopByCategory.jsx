import React from "react";
import PropTypes from "prop-types";
import style from "./ShopByCategory.module.scss";

const ShopByCategory = (props) => {
  const { totalPhones, totalTablets, totalAccessories } = props;

  return (
    <>
      <div className={style.header}>
        <h2 className={style.categoryTitle}>Shop by category</h2>
      </div>
      <div className={style.wrapper}>
        <div>
          <div className={style.wallpaperPhone}></div>
          <h4 className={style.subTitle}>Mobile phones</h4>
          <p>{totalPhones} models</p>
        </div>
        <div>
          <div className={style.wallpaperTablets}></div>
          <h4 className={style.subTitle}>Tablets</h4>
          <p>{totalTablets} models</p>
        </div>
        <div>
          <div className={style.wallpaperAccessories}></div>
          <h4 className={style.subTitle}>Accessories</h4>
          <p>{totalAccessories} models</p>
        </div>
      </div>
    </>
  );
};

ShopByCategory.propTypes = {
  totalPhones: PropTypes.number.isRequired,
  totalTablets: PropTypes.number.isRequired,
  totalAccessories: PropTypes.number.isRequired,
};
export default ShopByCategory;
