import React from "react";
import styles from "./Star.module.scss";

const Star = () => {
  return (
    <div className={styles.headStar}>
      <div className={styles.stars}></div>
      <div className={styles.stars2}></div>
      <div className={styles.stars3}></div>
    </div>
  );
};

export default Star;
