import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
// import DownArrowIcon from "../Icons/DownArrowIcon";
// import UpArrowIcon from "../Icons/UpArrowIcon";
import styles from "./Sort.module.scss";

const Sort =
  // React.memo(
  ({ handleSortChange, sortValue }) => {
    // const [sortMenuIsOpen, setSortMenuIsOpen] = useState(false);

    // console.log(sortValue);

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

*/
    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        width: "176px",
        height: "40px",
        color: "#F1F2F9",
        backgroundColor: "#323542",
        border: "1px solid transparent",
        borderRadius: "0px",
        boxShadow: "none",
        outline: "none",
        "&:focus-within": {
          borderColor: "#905BFF",
        },
        "&:hover": {
          borderColor: state.isFocused ? "transparent" : "#4A4D58",
        },
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#323542" : "#0F1121",
        color: state.isSelected ? "#F1F2F9" : "#75767F",
        fontSize: "14px",
        fontWeight: "600",
        lineHeight: "21px",
        "&:hover": {
          backgroundColor: "#323542",
          color: "#F1F2F9",
        },
      }),
      singleValue: (provided) => ({
        ...provided,
        color: "#F1F2F9",
        fontFamily: "Mont",
        fontSize: "14px",
        fontWeight: "700",
        lineHeight: "21px",
      }),
      indicatorsContainer: (provided) => ({
        ...provided,
        backgroundColor: "#323542",
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        display: "none",
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "#75767F",
        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
        "&:hover, &:focus": {
          color: "#75767F",
        },
      }),
      menu: (provided) => ({
        ...provided,
        width: "176px",
        backgroundColor: "#0F1121",
        border: "1px solid",
        borderColor: "#905BFF",
      }),
    };

    const options = [
      { value: "-brandNew", label: "Newest first" },
      { value: "-available", label: "In Stock first" },
      { value: "price", label: "Price asc" },
      { value: "-price", label: "Price desc" },
    ];

    return (
      <div className={styles.sortContainer}>
        <label htmlFor="sortSelect" className={styles.sortTitle}>
          Sort by:
        </label>
        <Select
          id="sortSelect"
          options={options}
          value={options.find((option) => option.value === sortValue)}
          // defaultValue={sortValue}
          onChange={(selectedOption) => handleSortChange(selectedOption.value)}
          // onMenuOpen={() => setSortMenuIsOpen(true)}
          // onMenuClose={() => setSortMenuIsOpen(false)}
          styles={customStyles}
        />
      </div>
    );
  };
// )

Sort.propTypes = {
  handleSortChange: PropTypes.func.isRequired,
  sortValue: PropTypes.string.isRequired,
};

export default Sort;
