import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Style from "./SingleProduct.module.scss";

const SingleProduct = () => {
  const { productId } = useParams();
  console.log(productId);

  const location = useLocation();
  const pathname = location.pathname;

  const queryParams = new URLSearchParams(location.search);
  const [color, setColor] = useState(queryParams.get("color"));
  const [capacity, setCapacity] = useState(queryParams.get("capacity"));

  console.log(color);
  console.log(capacity);

  const [model, setModel] = useState();
  console.log(model);

  useEffect(() => {
    fetch(`http://localhost:4000/api/mobile-models/${productId}/`)
      .then((response) => {
        console.log("THEEEEEEEEEN");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("THEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEN", data);
        setModel(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [pathname]);

  return (
    <div className={Style.testBox}>
      <h1 className={Style.tittle}>This is SingleProduct Page </h1>
      <Link className={Style.linksBtn} to="/">
        Home
      </Link>
    </div>
  );
};

export default SingleProduct;
