import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
// import { Formik, Form } from "formik";
import styles from "./Sort.module.scss";

const Sort = ({ handleSortChange, sortValue }) => {
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
        {/* <option value="All">All</option> */}
        <option value="-brandNew">Newest first</option>
        <option value="-available">In Stock first</option>
        <option value="price">Price asc</option>
        <option value="-price">Price desc</option>
      </select>
    </>
  );
};

Sort.propTypes = {
  handleSortChange: PropTypes.func.isRequired,
  sortValue: PropTypes.string.isRequired,
};

export default Sort;
