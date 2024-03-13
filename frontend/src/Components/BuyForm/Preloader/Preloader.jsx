import React from "react";
import styles from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div id="preloader" className={styles.preloader}>
      <div id="loader" className={styles.loader}></div>
    </div>
  );
};

export default Preloader;
