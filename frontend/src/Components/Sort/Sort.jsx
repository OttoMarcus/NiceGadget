import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import DownArrow from "../Icons/DownArrow";
import UpArrow from "../Icons/UpArrow";
import styles from "./Sort.module.scss";

const Sort = ({ handleSortChange, sortValue }) => {
  const [sortMenuIsOpen, setSortMenuIsOpen] = useState(false);

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
  // const [selectedOption, setSelectedOption] = useState("-brandNew");

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "176px",
      height: "40px",
      color: "#F1F2F9",
      backgroundColor: "#323542", // Цвет фона по умолчанию
      borderRadius: "0px",
      borderColor: state.isFocused ? "#905BFF" : "#4A4D58", // Цвет рамки при фокусировке
      "&:hover": {
        border: "1px solid #4A4D58",
      },
      "&:focus": {
        border: "1px solid",
        // backgroundColor: '#323542',
        // Цвет фона при наведении
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#323542" : "#0F1121", // Цвет фона выбранной опции
      color: state.isSelected ? "#F1F2F9" : "#75767F", // Цвет текста выбранной опции
      fontFamily: "Mont",
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "21px",
      "&:hover": {
        backgroundColor: "#323542", // Цвет фона при наведении
        color: "#F1F2F9", // Цвет текста при наведении
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#F1F2F9", // Цвет текста выбранной опции
      fontFamily: "Mont",
      fontSize: "14px",
      fontWeight: "700",
      lineHeight: "21px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      backgroundColor: "#323542", // Цвет фона стрелки
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none", // Убираем вертикальную черту
    }),
    // dropdownIndicator: () => (
    //   <DropdownIndicator isOpen={menuIsOpen} />
    //   <DropdownIndicator isOpen={menuIsOpen} />
    // ),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#75767F", // Цвет стрелки
      "--rotate": state.menuIsOpen ? "180deg" : "0deg", // Переменная для угла поворота
      transform: `rotate(var(--rotate))`, // Применяем поворот
      // transform: state.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)', // Поворот стрелки при открытом/закрытом списке
      "&:hover, &:focus": {
        color: "#75767F", // Цвет стрелки при ховере или фокусе
      },
    }),
    menu: (provided) => ({
      ...provided,
      width: "176px",
      backgroundColor: "#0F1121",
      border: "1px solid", // Толщина border для выпадающего списка
      borderColor: "#905BFF", // Цвет border для выпадающего списка
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
      {/* <select
        id="sortSelect"
        value={sortValue}
        className={styles.sortSelect}
        onChange={(e) => {
          handleSortChange(e);
        }}
      >
          <option value="-brandNew" className={styles.sortOption}>Newest first</option>
          <option value="-available" className={styles.sortOption}>In Stock first</option>
          <option value="price" className={styles.sortOption}>Price asc</option>
          <option value="-price" className={styles.sortOption}>Price desc</option>
      </select> */}
      {/* <Select options={options} /> */}
      <Select
        id="sortSelect"
        options={options}
        value={options.find((option) => option.value === sortValue)}
        // defaultValue={sortValue}
        onChange={(selectedOption) => handleSortChange(selectedOption.value)}
        onMenuOpen={() => setSortMenuIsOpen(true)}
        onMenuClose={() => setSortMenuIsOpen(false)}
        styles={customStyles}
      />
    </div>
  );
};

Sort.propTypes = {
  handleSortChange: PropTypes.func.isRequired,
  sortValue: PropTypes.string.isRequired,
};

export default Sort;
