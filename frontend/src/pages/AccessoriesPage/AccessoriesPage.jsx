import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./AccessoriesPage.module.scss";
import CardAccessories from "../../Components/CardAccessories/CardAccessories";

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
      <div className={Style.testBox}>
        <div className={Style.timeWrapper}>
          <h1 className={Style.tittle}>This is Accessories Page</h1>
          <Link className={Style.linksBtn} to="/">
            Home
          </Link>
        </div>
      </div>
      <div className={Style.cardWrapper}>
        {accessoriesArr &&
          accessoriesArr.map((accessory, index) => (
            <CardAccessories
              key={accessory._id}
              name={accessory.name}
              color={accessory.color}
              price={accessory.price}
              picture={accessory.picture}
              weight={accessory.weight}
              size={accessory.size}
              available={accessory.available}
              id={accessory.id}
              _id={accessory._id}
              category={accessory.category}
            />
          ))}
      </div>
    </>
  );
};

export default Accessories;
