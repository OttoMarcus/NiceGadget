import React, { useState } from "react";
import PropTypes from "prop-types";

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    hotPrices: false,
    inStock: false,
    minPrice: "",
    maxPrice: "",
    modelLine: "",
    capacity: "",
    color: "",
    ram: "",
    screen: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <div>
      <form onSubmit={handleFilterSubmit}>
        <label>
          <input
            type="checkbox"
            name="hotPrices"
            checked={filters.hotPrices}
            onChange={handleCheckboxChange}
          />
          Hot Prices
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={filters.inStock}
            onChange={handleCheckboxChange}
          />
          In Stock
        </label>
        <br />
        <label>
          Min Price:
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Model Line:
          <input
            type="text"
            name="modelLine"
            value={filters.modelLine}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Capacity:
          <input
            type="text"
            name="capacity"
            value={filters.capacity}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={filters.color}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          RAM:
          <input
            type="text"
            name="ram"
            value={filters.ram}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Screen:
          <input
            type="text"
            name="screen"
            value={filters.screen}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;

// With Material UI===========================================================

// import React, { useState } from "react";
// import { Checkbox, TextField, Button } from "@material-ui/core";
// import "./Filters.css"; // Подключаем файл со стилями

// const Filters = ({ handleFilter }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     hotPrices: false,
//     inStock: false,
//     minPrice: "",
//     maxPrice: "",
//     modelLine: "",
//     capacity: "",
//     color: "",
//     ram: "",
//     screen: ""
//   });

//   const toggleFilters = () => {
//     setIsOpen(!isOpen);
//   };

//   const applyFilters = () => {
//     handleFilter(filters);
//     setIsOpen(false);
//   };

//   return (
//     <div className={`filters-container ${isOpen ? 'open' : ''}`}>
//       <button className="toggle-btn" onClick={toggleFilters}>Toggle Filters</button>
//       <div className="filters-content">
//         <Checkbox
//           checked={filters.hotPrices}
//           onChange={(e) => setFilters({ ...filters, hotPrices: e.target.checked })}
//         />
//         <label>Hot prices</label>
//         <Checkbox
//           checked={filters.inStock}
//           onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
//         />
//         <label>In stock</label>
//         <TextField
//           label="Min price"
//           value={filters.minPrice}
//           onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
//         />
//         <TextField
//           label="Max price"
//           value={filters.maxPrice}
//           onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
//         />
//         <TextField
//           label="Model line"
//           value={filters.modelLine}
//           onChange={(e) => setFilters({ ...filters, modelLine: e.target.value })}
//         />
//         {/* Other filter inputs */}
//         <Button onClick={applyFilters}>Apply</Button>
//       </div>
//     </div>
//   );
// };

// export default Filters;
