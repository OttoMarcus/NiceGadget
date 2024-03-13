import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import { useLocation } from "react-router-dom";
import axios from "axios";

import styles from "../Tablets/Tablets.module.scss";

const Tablets = () => {
  const [tabletsArr, setTabletsArr] = useState({ data: [] });

  const location = useLocation();
  const typeModel = location.pathname.slice(1);

  useEffect(() => {
    fetchTablets();
  }, []);

  const fetchTablets = () => {
    axios
      .get(`http://localhost:4000/api/tablets`)
      .then((response) => {
        setTabletsArr({ data: response.data.data });
      })
      .catch((error) => {
        console.error("Fetching error:", error);
      });
  };

  return (
    <article className={styles.container}>
      <h1 className={styles.tabletsTitle}>Tablets</h1>
      <h3 className={styles.subtitle}>models</h3>

      <div>Filtering block</div>

      <div className={styles.resultWrapper}>
        {Array.isArray(tabletsArr.data) &&
          tabletsArr.data.map((item) => (
            <Card key={item.id} category={typeModel} {...item} />
          ))}
      </div>
    </article>
  );
};

export default Tablets;
