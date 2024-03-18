import React from "react";
import styles from "./Recotypole.module.scss";
import Image from "./tumbleweed.png";

const Recotypole = () => {
  return (
    <div className={styles.rollInOut}>
      <img className={styles.image} src={Image} alt="tumbl" />
    </div>
  );
};

export default Recotypole;
