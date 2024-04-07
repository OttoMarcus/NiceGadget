import React, { useState, useEffect, useRef } from "react";
import styles from "../BrandNews/BrandNews.module.scss";
import axios from "axios";
import CardAccessories from "../Cards/CardAccessories";
import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import Card from "../Cards/Card";
import { mixAccessoriesAndPhones } from "../../helpers/mixAccessoriesAndPhones";

const BuyTogether = () => {
  const containerRef = useRef(null);
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    const fetchRandomItems = async () => {
      try {
        const [accessoriesResponse, phonesResponse] = await Promise.all([
          axios.get(`/api/accessories?perPage=7`),
          axios.get(`/api/phones?discount`),
        ]);

        // /api/phones?brandNew=true

        const accessoriesData = accessoriesResponse.data.data;
        const phonesData = phonesResponse.data.data;

        // Combine accessories and phones into one array
        const allItems = mixAccessoriesAndPhones(accessoriesData, phonesData);
        console.log(allItems);
        // Shuffle the combined array
        const shuffledItems = shuffle(allItems);
        // Select the first 4 accessories and first 4 phones
        const selectedItems = shuffledItems.slice(0, 13);

        setRandomItems(selectedItems);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    fetchRandomItems();
  }, []);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

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

  const handlePhoneClick = () => {
    window.location.reload();
  };

  console.log(randomItems);

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Buy Together</h2>
        <div className={styles.btnGroup}>
          <div className={styles.arrow} onClick={scrollLeft}>
            <LeftArrowIcon />
          </div>
          <div className={styles.arrow} onClick={scrollRight}>
            <RightArrowIcon />
          </div>
        </div>
      </div>
      {randomItems.length > 0 && (
        <div className={styles.cardsContainer} ref={containerRef}>
          {randomItems.map((item) => (
            <div key={item.id} onClick={handlePhoneClick}>
              {item && item.category === "accessories" ? (
                <CardAccessories {...item} />
              ) : (
                <Card {...item} />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BuyTogether;
