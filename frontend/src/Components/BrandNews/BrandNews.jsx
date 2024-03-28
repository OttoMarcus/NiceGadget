import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import React, { useState, useEffect, useRef } from "react";
import styles from "./BrandNews.module.scss";
import Card from "../Cards/Card";

const BrandNew = () => {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/phones");
        const data = await response.json();
        setProducts(data.data.filter((product) => product.brandNew === true));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 600,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 600,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Brand New</h2>
        <div className={styles.btnGroup}>
          <div className={styles.arrow} onClick={scrollLeft}>
            <LeftArrowIcon />
          </div>
          <div className={styles.arrow} onClick={scrollRight}>
            <RightArrowIcon />
          </div>
        </div>
      </div>
      <div className={styles.cardsContainer} ref={containerRef}>
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

export default BrandNew;
