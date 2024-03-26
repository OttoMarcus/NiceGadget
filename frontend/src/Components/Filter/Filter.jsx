import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Filter.module.scss";
import PropTypes from "prop-types";

const Filter = ({ handleFilter }) => {
  const [filters, setFilters] = useState({
    hotPrices: false,
    inStock: false,
    minPrice: "",
    maxPrice: "",
    modelLine: ["iPhone 13", "iPhone 14"],
    capacity: [],
    color: [],
    ram: [],
    screen: [],
  });

  const navigate = useNavigate();
  const location = useLocation();

  // const queryString = new URLSearchParams(filters).toString();
  // console.log(queryString);

  // console.log(filters);
  //   const queryString = Object.keys(filters)
  //   .filter(key => filters[key] !== "")
  //   .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(filters[key]))
  //   .join("&");
  //   console.log(queryString);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params);
    if (params.length !== 0) {
      //якщо взагалі існують квері параметри (не пусті)
      const newFilters = {};

      for (let [key, value] of params.entries()) {
        if (Array.isArray(key[value])) {
          // якщо значення ключа в параметрах - масив, то записуємо в
          newFilters[key] = value.split(",");
        } else if (key[value] !== undefined || key[value] !== null) {
          newFilters[key] = value;
        } else {
          newFilters[key] = "";
        }
        // if (key === "modelLine" || key === "capacity" || key === "color" || key === "ram" || key === "screen") {
        //   newFilters[key] = value.split(",");
        // } else {
        //   newFilters[key] = value;
        // }
      }
      setFilters(newFilters);
    }
  }, [location.search]);

  const applyFilters = () => {
    const queryParams = new URLSearchParams();

    for (let key in filters) {
      if (
        key === "modelLine" ||
        key === "capacity" ||
        key === "color" ||
        key === "ram" ||
        key === "screen"
      ) {
        queryParams.append(key, filters[key].join(","));
      } else {
        queryParams.append(key, filters[key]);
      }
    }

    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });

    handleFilter(queryParams);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleGroupCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    // console.log(name);
    // console.log(filters.name);
    let updatedModelLine = [...filters[name]]; // Создаем копию массива modelLine

    if (checked) {
      updatedModelLine.push(value); // Добавляем значение в массив, если чекбокс отмечен
      console.log(updatedModelLine);
    } else {
      updatedModelLine = updatedModelLine.filter((item) => item !== value);
      console.log(updatedModelLine); // Удаляем значение из массива, если чекбокс снят
    }

    setFilters({ ...filters, [name]: updatedModelLine }); // Обновляем состояние filters
  };

  // const handleSelectChange = (e) => {
  //   const { name, options } = e.target;
  //   const selectedOptions = Array.from(options)
  //     .filter(option => option.selected)
  //     .map(option => option.value);
  //   setFilters({ ...filters, [name]: selectedOptions });
  // };

  return (
    <div className={styles.filterContainer}>
      <label>
        <input
          type="checkbox"
          name="discount"
          checked={filters.hotPrices}
          onChange={handleCheckboxChange}
        />
        Hot prices
      </label>
      <label>
        <input
          type="checkbox"
          name="inStock"
          checked={filters.inStock}
          onChange={handleCheckboxChange}
        />
        In stock
      </label>
      <label>
        Min Price:
        <input
          type="text"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Max Price:
        <input
          type="text"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleInputChange}
        />
      </label>

      <div>
        <h3>Model Line</h3>
        <label htmlFor="modelLine">
          <input
            type="checkbox"
            name="modelLine"
            value="iPhone 13"
            onChange={handleGroupCheckboxChange}
          />
          iPhone 13
        </label>
        <label htmlFor="modelLine">
          <input
            type="checkbox"
            name="modelLine"
            value="iPhone 14"
            onChange={handleGroupCheckboxChange}
          />
          iPhone 14
        </label>
        <label htmlFor="modelLine">
          <input
            type="checkbox"
            name="modelLine"
            value="iPhone 15"
            onChange={handleGroupCheckboxChange}
          />
          iPhone 15
        </label>
      </div>

      {/* <div>
        <h3>Capacity</h3>
          <label htmlFor="capacity"><input type="checkbox" name="capacity" value="64" onChange={handleCheckboxChange}/>64GB</label>
        <label htmlFor="capacity"><input type="checkbox" name="capacity" value="128" onChange={handleCheckboxChange} />128GB</label>
        <label htmlFor="capacity"><input type="checkbox" name="capacity" value="256" onChange={handleCheckboxChange} />256GB</label>
        <label htmlFor="capacity"><input type="checkbox" name="capacity" value="512" onChange={handleCheckboxChange} />512GB</label>
        <label htmlFor="capacity"><input type="checkbox" name="capacity" value="1024" onChange={handleCheckboxChange}/>1024GB</label>
      </div>  */}

      {/* <select
        name="capacity"
        multiple
        value={filters.capacity}
        onChange={handleSelectChange}
      >
        <option value="32">32GB</option>
        <option value="64">64GB</option>
        <option value="128">128GB</option>

      </select> */}

      {/* <select
        name="color"
        multiple
        value={filters.color}
        onChange={handleSelectChange}
      >
        <option type="checkbox" value="black">Black</option>
        <option type="checkbox" value="white">White</option>
        <option type="checkbox" value="pink">Gold</option>
      </select>
      <select
        name="ram"
        multiple
        value={filters.ram}
        onChange={handleSelectChange}
      >
        <option type="checkbox" value="4">4GB</option>
        <option type="checkbox" value="6">6GB</option>
        <option type="checkbox" value="8">8GB</option>
      </select>
      <select
        name="screen"
        multiple
        value={filters.screen}
        onChange={handleSelectChange}
      >
        <option type="checkbox" value="5.5">5.5 inches</option>
        <option type="checkbox" value="6.1">6.1 inches</option>
        <option type="checkbox" value="6.7">6.7 inches</option>
      </select> */}

      <button onClick={applyFilters}>Apply</button>
    </div>
  );
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default Filter;

// With Material UI===========================================================

// import React, { useState } from "react";
// import { Checkbox, TextField, Button } from "@material-ui/core";
// import styles from "./Filter.module.scss"; // Подключаем файл со стилями

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
