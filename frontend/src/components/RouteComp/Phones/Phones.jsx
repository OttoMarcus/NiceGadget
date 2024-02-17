import React from 'react';
import {Link} from "react-router-dom";
import Style from "./Phones.module.scss";
import ProductPage from "../../ProductPage/ProductPage";
import Card from "../../CardComp/Card";
import Photo1 from "../../CardComp/iphone1.png";
const Phones = () => {
    return (
        <div>
        <Link to={`/products/`}> <Card imageSrc={Photo1} model={"Iphone 14 Pro Max 128GB Gold (MX34551)"} capacity={"128GB"} price={799} ram={"6GB"} screen={"6.1"}/></Link>
          {/*/products?color=blue*/}
         <ProductPage/>
        </div>
    );
};

export default Phones;
