import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import React, { useState, useEffect, useRef } from "react";
import style from "./BrandNews.module.scss";
import Card from "../Card/Card";
const BrandNew = () => {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/brand-news");
        const data = await response.json();
        setProducts(data.data);
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
      <div className={style.header}>
        <h2 className={style.title}>Brand New</h2>
        <div className={style.btnGroup}>
          <div className={style.arrow} onClick={scrollLeft}>
            <LeftArrowIcon />
          </div>
          <div className={style.arrow} onClick={scrollRight}>
            <RightArrowIcon />
          </div>
        </div>
      </div>
      <div className={style.cardsContainer} ref={containerRef}>
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

export default BrandNew;
