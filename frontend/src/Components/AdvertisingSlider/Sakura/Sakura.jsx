import React from "react";
import styles from "./Sakura.module.scss";
import Image from "./sakura-leaves.gif";

const Sakura = () => {
  return (
    <div className={styles.sakura}>
      <img src={Image} alt="sakura" />
    </div>
  );
};

export default Sakura;
