import React from "react";
import PropTypes from "prop-types";
import Style from "./ShopByCategory.module.scss";

const ShopByCategory = (props) => {
  const { totalPhones, totalTablets, totalAccessories } = props;

  return (
    <>
      <h2>Shop by category</h2>
      <div className={Style.wrapper}>
        <div>
          <div className={Style.wallpaperPhone}></div>
          <h4>Mobile phones</h4>
          <p>{totalPhones} models</p>
        </div>
        <div>
          <div className={Style.wallpaperTablets}></div>
          <h4>Tablets</h4>
          <p>{totalTablets} models</p>
        </div>
        <div>
          <div className={Style.wallpaperAccessories}></div>
          <h4>Accessories</h4>
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
