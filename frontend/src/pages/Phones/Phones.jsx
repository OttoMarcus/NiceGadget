import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../Components/Card/Card";
import { useLocation } from "react-router-dom";

import styles from "./Phones.module.scss";

const Phones = () => {
  const [phonesArr, setPhonesArr] = useState({ data: [] });
  const location = useLocation();
  const typeModel = location.pathname.slice(1);

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = () => {
    axios
      .get(`http://localhost:4000/api/phones`)
      .then((response) => {
        setPhonesArr({ data: response.data.data });
      })
      .catch((error) => {
        console.error("Fetching error:", error);
      });
  };
  return (
    <article className={styles.container}>
      <h1 className={styles.phonesTitle}>Mobile phones</h1>
      <h3 className={styles.subtitle}>models</h3>

      <div>Filtering block</div>

      <div className={styles.resultWrapper}>
        {Array.isArray(phonesArr.data) &&
          phonesArr.data.map((item) => (
            <Card key={item.id} category={typeModel} {...item} />
          ))}
      </div>
    </article>
  );
};

export default Phones;
