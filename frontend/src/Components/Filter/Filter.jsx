import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import styles from "./Filter.module.scss";
import PropTypes from "prop-types";

const Filter = ({ handleFilter }) => {
  const [filters, setFilters] = useState({
    discount: false,
    available: false,
    minPrice: "",
    maxPrice: "",
    modelName: ["iPhone 13", "iPhone 14"],
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

  // function useQueryParams(initialState, queryParams) {
  //   const location = useLocation();

  //   useEffect(() => {
  //     const searchParams = new URLSearchParams(location.search);
  //     const newFilters = { ...initialState };

  //     // Перебираем все ключи начального состояния
  //     Object.keys(initialState).forEach(key => {
  //       // Если параметр присутствует в запросе, устанавливаем его значение в новый объект фильтров
  //       if (queryParams[key] && searchParams.has(key)) {
  //         newFilters[key] = searchParams.get(key);
  //       }
  //     });

  //     // Устанавливаем новые значения фильтров в состоянии
  //     setFilters(newFilters);
  //   }, [location.search]); // useEffect будет срабатывать при изменении query параметров

  //   return useState(initialState);
  // }

  // useEffect будет срабатывать при изменении query параметров

  const handleGroupCheckboxChange = (e) => {
    console.log(filters[e.target.name].includes(e.target.value));
    const { name, checked, value } = e.target;
    console.log(name);
    console.log(value);
    console.log(checked);
    // console.log(name);

    let groupValues = filters[name];
    console.log("groupValues: ", groupValues);
    // console.log(groupValues);
    // console.log(typeof groupValues);
    if (checked) {
      if (!groupValues.includes(value)) {
        groupValues.push(value);
      }
      // groupValues = new Set([...groupValues])
      // groupValues.push(value); // Добавляем значение в массив, если чекбокс отмечен
      console.log("groupValues after push: ", groupValues);
    } else {
      groupValues = groupValues.filter((item) => item !== value);
      console.log(groupValues); // Удаляем значение из массива, если чекбокс снят
    }

    // let updatedModelLine = [...filters[name]]; // Создаем копию массива modelLine

    // if (checked) {
    //   updatedModelLine.push(value); // Добавляем значение в массив, если чекбокс отмечен
    //   console.log(updatedModelLine);
    // } else {
    //   updatedModelLine = updatedModelLine.filter((item) => item !== value);
    //   console.log(updatedModelLine); // Удаляем значение из массива, если чекбокс снят
    // }
    const newFilters = { ...filters, [name]: groupValues };

    console.log(newFilters);
    setFilters(newFilters);
    //   const queryString = Object.keys(newFilters)
    //   .filter(key => newFilters[key] !== "")
    //   .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(newFilters[key]))
    //   .join("&");
    // console.log(queryString);
    // const newPath = `${window.location.pathname}?${queryString}`;
    // console.log(newPath);
    // window.history.pushState({ path: newPath }, '', newPath)

    // setFilters({ ...filters, [name]: updatedModelLine }); // Обновляем состояние filters
  };

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   console.log(params);
  //   if (params.length !== 0) {
  //     //якщо взагалі існують квері параметри (не пусті)
  //     const newFilters = {};

  //     for (let [key, value] of params.entries()) {
  //       if (Array.isArray(key[value])) {
  //         // якщо значення ключа в параметрах - масив, то записуємо в
  //         newFilters[key] = value.split(",");
  //       } else if (key[value] !== undefined || key[value] !== null) {
  //         newFilters[key] = value;
  //       } else {
  //         newFilters[key] = "";
  //       }
  //       // if (key === "modelLine" || key === "capacity" || key === "color" || key === "ram" || key === "screen") {
  //       //   newFilters[key] = value.split(",");
  //       // } else {
  //       //   newFilters[key] = value;
  //       // }
  //     }
  //     setFilters(newFilters);
  //   }
  // }, [location.search]);

  const applyFilters = (filter) => {
    // const queryParams = new URLSearchParams();
    let nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(
        (value) => value !== "" && value.length !== 0
      )
    );
    console.log(nonEmptyFilters);

    // let queryString = Object.keys(filters)
    //   .filter(key => filters[key] !== "")
    //   .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(filters[key]))
    // .join("&");

    // let queryString = Object.entries(filters)
    // .filter(key => filters[key] !== "")
    // .map((key) => key = filters[key])
    // .join("&");

    // console.log(queryString);
    // console.log(decodeURI(queryString));
    // =====================================================================
    // console.log('queryString after filter' , queryString);

    // const queryString = new URLSearchParams(nonEmptyFilters).toString()
    const query = queryString.stringify(nonEmptyFilters);
    console.log("queryString to URL:", query);

    // const newPath = `${window.location.pathname}?${queryString}`;
    // console.log(newPath);
    // window.history.pushState({ path: newPath }, '', newPath)

    handleFilter(query);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    setFilters({ ...filters, [name]: value });
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
          checked={filters.discount}
          onChange={handleCheckboxChange}
        />
        Hot prices
      </label>
      <label>
        <input
          type="checkbox"
          name="available"
          checked={filters.available}
          onChange={handleCheckboxChange}
        />
        In stock only
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
        <label htmlFor="modelName">
          <input
            type="checkbox"
            name="modelName"
            value="iPhone 13"
            checked={filters.modelName.includes("iPhone 13")}
            onChange={(e) => handleGroupCheckboxChange(e)}
          />
          iPhone 13
        </label>
        <label htmlFor="modelName">
          <input
            type="checkbox"
            name="modelName"
            value="iPhone 14"
            checked={filters.modelName.includes("iPhone 14")}
            onChange={(e) => handleGroupCheckboxChange(e)}
          />
          iPhone 14
        </label>
        <label htmlFor="modelName">
          <input
            type="checkbox"
            name="modelName"
            value="iPhone 15"
            checked={filters.modelName.includes("iPhone 15")}
            onChange={(e) => handleGroupCheckboxChange(e)}
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
