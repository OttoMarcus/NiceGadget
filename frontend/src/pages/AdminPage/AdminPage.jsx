import React, { useEffect, useState } from "react";
import adminOptions from "./adminOptions";
import { useSelector } from "react-redux";
import AdminOption from "./AdminOption/AdminOption";
import { findComponentByTitleAndLabel } from "./findComponentByTitleAndLabel";

import styles from "./AdminPage.module.scss";

const AdminPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.adminContent}>
        <div className={styles.adminOptions}>
          {adminOptions.map((opt) => {
            return (
              <AdminOption
                optionTitle={opt?.title}
                subOptions={opt?.subOptions}
                key={opt?.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
