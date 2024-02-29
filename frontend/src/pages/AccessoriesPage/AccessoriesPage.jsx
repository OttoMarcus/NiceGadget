import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./AccessoriesPage.module.scss";
import CardAccessories from "../../Components/CardAccessories/CardAccessories";
import Home from "../../Components/Icons/Home";
import LeftArrow from "../../Components/Icons/LeftArrow";
const Accessories = () => {
  const [accessoriesArr, setAccessoriesArr] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/api/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(({ data }) => {
        setAccessoriesArr(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, []);

  return (
    <>
      <div className={Style.buttonWrapper}>
        <div className={Style.buttonBack}>
          <Link className={Style.linksBtn} to="/">
            <LeftArrow />
            Back
          </Link>
        </div>
        <div className={Style.buttonHome}>
          <Link className={Style.linksBtn} to="/">
            <Home />
            Home
          </Link>
        </div>
      </div>

      <div className={Style.cardWrapper}>
        {accessoriesArr &&
          accessoriesArr.map((accessory, index) => (
            <CardAccessories
              key={index}
              name={accessory.name}
              color={accessory.color}
              price={accessory.price}
              picture={accessory.picture}
              weight={accessory.weight}
              size={accessory.size}
              available={accessory.available}
            />
          ))}
      </div>
    </>
  );
};

export default Accessories;
