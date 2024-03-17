import React from "react";
import PropTypes from "prop-types";
// import PropTypes from "prop-types";
// import { Formik, Form } from "formik";
import styles from "./PerPageSelect.module.scss";

const PerPageSelect = ({ handlePerPageChange, cardsPerPageValue }) => {
  return (
    <>
      <label htmlFor="perPageSelect">Items on page:</label>
      <select
        id="perPageSelect"
        value={cardsPerPageValue}
        onChange={(e) => {
          handlePerPageChange(e);
        }}
      >
        {/* <option value="All">All</option> */}
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="24">24</option>
        <option value="48">48</option>
      </select>
    </>
  );
};

PerPageSelect.propTypes = {
  handlePerPageChange: PropTypes.func.isRequired,
  cardsPerPageValue: PropTypes.number.isRequired,
};

export default PerPageSelect;
