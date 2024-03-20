import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import DownArrow from "../Icons/DownArrow";
import UpArrow from "../Icons/UpArrow";
import styles from "./PerPageSelect.module.scss";

const PerPageSelect = ({ handlePerPageChange, cardsPerPageValue }) => {
  const [perPageMenuIsOpen, setPerPageMenuIsOpen] = useState(false);

  // console.log(cardsPerPageValue);

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
      width: "128px",
      height: "40px",
      color: "#F1F2F9",
      backgroundColor: "#323542", // Цвет фона по умолчанию
      borderRadius: "0px",
      borderColor: state.isFocused ? "#905BFF" : "#4A4D58", // Цвет рамки при фокусировке
      "&:hover": {
        border: "1px solid #4A4D58",
      },
      // '&:focus': {
      //   border: '1px solid',
      //   // backgroundColor: '#323542',
      //   // Цвет фона при наведении
      // },
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
      width: "128px",
      backgroundColor: "#0F1121",
      border: "1px solid", // Толщина border для выпадающего списка
      borderColor: "#905BFF", // Цвет border для выпадающего списка
    }),
  };

  const options = [
    { value: "8", label: "8" },
    { value: "16", label: "16" },
    { value: "24", label: "24" },
    { value: "48", label: "48" },
  ];

  return (
    <div className={styles.perPageContainer}>
      <label htmlFor="perPageSelect" className={styles.perPageTitle}>
        Items on page:
      </label>
      <Select
        id="perPageSelect"
        options={options}
        value={options.find((option) => option.value === cardsPerPageValue)}
        onChange={(selectedOption) => handlePerPageChange(selectedOption.value)}
        onMenuOpen={() => setPerPageMenuIsOpen(true)}
        onMenuClose={() => setPerPageMenuIsOpen(false)}
        styles={customStyles}
      />
    </div>
  );
};

PerPageSelect.propTypes = {
  handlePerPageChange: PropTypes.func.isRequired,
  cardsPerPageValue: PropTypes.number.isRequired,
};

export default PerPageSelect;
