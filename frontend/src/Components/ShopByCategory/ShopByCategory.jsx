import React from "react";
import PropTypes from "prop-types";
import styles from "./ShopByCategory.module.scss";

const ShopByCategory = (props) => {
  const { totalPhones, totalTablets, totalAccessories } = props;

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.categoryTitle}>Shop by category</h2>
      </div>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.wallpaperPhone}></div>
          <h4 className={styles.subTitle}>Mobile phones</h4>
          <p>{totalPhones} models</p>
        </div>
        <div>
          <div className={styles.wallpaperTablets}></div>
          <h4 className={styles.subTitle}>Tablets</h4>
          <p>{totalTablets} models</p>
        </div>
        <div>
          <div className={styles.wallpaperAccessories}></div>
          <h4 className={styles.subTitle}>Accessories</h4>
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
