import React from "react";
import { Link, useParams } from "react-router-dom";
import Style from "./SingleProduct.module.scss";

const SingleProduct = () => {
  const { productId, color } = useParams();
  console.log(color);
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
