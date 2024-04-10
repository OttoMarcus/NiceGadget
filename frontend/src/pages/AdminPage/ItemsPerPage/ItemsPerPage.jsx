import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import selectCustomStyles from "./selectCustomStyles";

const options = [
  { value: 4, label: "4" },
  { value: 8, label: "8" },
  { value: 12, label: "12" },
];

const ItemsPerPage = ({ onChange, value }) => {
  return (
    <div>
      <Select
        options={options}
        styles={selectCustomStyles}
        value={options.find((opt) => opt.value === value)}
        onChange={(selectedOption) => onChange(selectedOption.value)}
      />
    </div>
  );
};

ItemsPerPage.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default ItemsPerPage;
