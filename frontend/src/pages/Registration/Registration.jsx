import React from "react";
import styles from "./Registration.module.scss";
import UserRegForm from "../../Components/Forms/UserRegFrom/UserRegForm";

const Registration = () => {
  return (
    <div className={`${styles.container}${styles.perPageWrapper}`}>
      <UserRegForm />
    </div>
  );
};

export default Registration;
