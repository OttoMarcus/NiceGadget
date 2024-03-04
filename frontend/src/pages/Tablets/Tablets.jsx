import React, { useState, useEffect } from "react";
// import styles from "./Tablets.module.scss";
import Card from "../../Components/Card/Card";
import { useLocation } from "react-router-dom";

const Tablets = () => {
  const [tabletsArr, setPhonesArr] = useState();

  const location = useLocation();
  const typeModel = location.pathname.slice(1);

  useEffect(() => {
    fetch("http://localhost:4000/api/tablets")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(({ data }) => {
        setPhonesArr(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, []);
  return (
    <>
      <div>
        {tabletsArr &&
          tabletsArr.map((card) => {
            return (
              <Card
                picture={card.picture}
                name={card.name}
                price={card.price}
                key={card.id}
                color={card.color}
                refModel={card.refModel}
                brandNew={card.brandNew}
                capacity={card.capacity}
                ram={card.ram}
                screen={card.screen}
                available={card.available}
                id={card.id}
                typeModel={typeModel}
              />
            );
          })}
      </div>
    </>
  );
};

export default Tablets;
