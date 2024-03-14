import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import styles from "../Filter/Filter.module.scss";

const Filter = () => {
  /* 
_id: 65dccf574fe60adcc4cf54c7
id: "1"
refModel: {
    modelId: "iphone-15-pro-max"
    modelName: "iPhone 15 Pro Max"
}
modelId: "iphone-15-pro-max"
modelName: "iPhone 15 Pro Max"
name: "Apple iPhone 15 Pro Max 256GB White"
capacity: "256"
color: "white"
price: 1575
ram: "8"
screen: "6.7"
picture: "https://res.cloudinary.com/de71eui6p/image/upload/v1708428092/iPhone%2…"
available: true
__v: 0
category: "phones"
brandNew: true
  
*/

  /*

FILTER

Simple Options: New, In Stock, HotPrice(?)

Options: 
- Price (Input Min - Input Max)
- Model line (14, 14Pro, 15, 15Pro, ... )
- Capacity (64Gb, 128Gb, 256Gb, 512Gb)
- RAM (2, 4, 8)
- Color
- Screen width (input range OR list of values)

==================================================

SORTING

- Newest
- HotPrice(?)
- Price desc. - Price asc.

- Available???


*/
  const [sortValue, setSortValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sort = urlParams.get("sort");

    console.log(`urlParams + ${urlParams}`);
    console.log(`sort + ${sort}`);
    console.log(`searchParams + ${searchParams}`);

    if (sort) {
      setSortValue(sort);
      // fetchDataWithSort(sort)
      console.log("SORT  is true!");
    }
  }, []);

  function handleSortChange(e) {
    e.preventDefault();
    const newSortValue = e.target.value;
    console.log(`newSortValue + ${newSortValue}`);

    const currentUrl = new URL(window.location);

    if (newSortValue) {
      currentUrl.searchParams.set("sort", newSortValue);
    } else {
      currentUrl.searchParams.delete("sort");
    }
    window.history.pushState({}, "", currentUrl.toString());

    setSortValue(newSortValue);

    // sort=price%201&perPage=8&startPage=1

    const findMatchingProducts = async () => {
      const newSortValue = new URLSearchParams();
      // newSortValue.set('price', 'asc')
      // const newSortValue = queryString.stringify({price: 'asc'})
      const mathcingProducts = await fetch(
        `http://localhost:4000/api/phones?sort=${newSortValue}&perPage=8&startPage=1`
      ).then((res) => console.log(res.json()));
    };
    findMatchingProducts();
    // fetchDataWithSort(sortValue);
  }

  //   function handleChange() {
  //     console.log("option changed!");
  //   }

  return (
    <>
      <label htmlFor="sortSelect">Sort by:</label>
      <select
        id="sortSelect"
        value={sortValue}
        onChange={(e) => {
          handleSortChange(e);
        }}
      >
        <option value="" onChange={searchParams.get("sort")}>
          All
        </option>
        <option value="brandNew">Newest</option>
        <option value="available">In Stock</option>
        <option value="price_desc">Price desc</option>
        <option value="price_asc">Price asc</option>
      </select>
    </>
  );
};

export default Filter;
