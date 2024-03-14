import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CardAccessories from "../../Components/CardAccessories/CardAccessories";

import styles from "./AccessoriesPage.module.scss";

const Accessories = () => {
  const [accessoriesArr, setAccessoriesArr] = useState({ data: [] });
  // const location = useLocation();
  // const typeModel = location.pathname.slice(1);

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = () => {
    axios
      .get("http://localhost:4000/api/accessories")
      .then((response) => {
        setAccessoriesArr({ data: response.data.data });
      })
      .catch((error) => {
        console.error("Fetching error:", error);
      });
  };

  return (
    <article className={styles.container}>
      <h1 className={styles.accessoriesTitle}>Accessories</h1>
      <h3 className={styles.subtitle}>models</h3>

      <div className={styles.resultWrapper}>
        {Array.isArray(accessoriesArr.data) &&
          accessoriesArr.data.map((item) => (
            <CardAccessories key={item.id} {...item} />
          ))}
      </div>
    </article>
  );
};

export default Accessories;
