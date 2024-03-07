import React from "react";
import styles from "./User.module.scss";

const User = () => {
  return (
    <>
      <h2 className={styles.title}>This is User Page</h2>
      <h3 className={styles.description}>There will locate:</h3>
      <ul className={styles.listStyle}>
        <li>Name</li>
        <li>Surname</li>
        <li>Phone Number</li>
        <li>Mail</li>
        <li>Address</li>
        <li>Order history</li>
      </ul>
    </>
  );
};

export default User;
