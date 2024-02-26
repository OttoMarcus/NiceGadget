import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Style from "./Phones.module.scss";
import Card from "../../Card/Card";

const Phones = () => {
  const [phonesArr, setPhonesArr] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/api/phones")
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
      <div className={Style.testBox}>
        <h1 className={Style.tittle}>This is Phones Page </h1>
        <Link className={Style.linksBtn} to="/">
          Home
        </Link>
      </div>
      <div>
        {phonesArr &&
          phonesArr.map((card) => {
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
              />
            );
          })}
      </div>
    </>
  );
};

export default Phones;
