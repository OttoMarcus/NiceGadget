import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import FilterButtonIcon from "../Icons/FilterButtonIcon";
import ClearFiltersIcon from "../Icons/ClearFiltersIcon";
// import DownArrowIcon from "../Icons/DownArrowIcon";
// import UpArrowIcon from "../Icons/UpArrowIcon";

// import queryString from "query-string";
import styles from "./Filter.module.scss";
import PropTypes from "prop-types";
import CloseFilterIcon from "../Icons/CloseFilterIcon";

/*
TO DO:
1. Set default min-max price?
9. Fix position of buttons, add scroll for filters.
10. Add MEMO
11. Fix filter close on Filter button click

*/
const OutsideClickHandler = ({ children, onOutsideClick }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
};

OutsideClickHandler.propTypes = {
  children: PropTypes.any,
  onOutsideClick: PropTypes.func,
};

const Filter = ({ handleFilter, filters, setFilters, clearFilters }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeId, setActiveId] = useState();
  // const [serverFilters, setServerFilters] = useState()

  // useEffect(() => {
  //   try {
  //     fetch(
  //     'http://localhost:4000/api/phones-filters'
  //     )
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       } else {
  //         return res.json()
  //       }
  //     })
  //     .then(data => setServerFilters(data))
  //     // .then(data => setServerFilters(data))
  //   } catch (error) {
  //       console.error("There was a problem with your fetch operation:", error);
  //   }
  // },[])

  const toggleAccordion = (value) => {
    setActiveId(activeId === value ? null : value);
  };

  const handleClose = () => {
    setIsFilterVisible(false);
  };

  const handleGroupCheckboxChange = (e) => {
    console.log(filters[e.target.name].includes(e.target.value));
    const { name, checked, value } = e.target;

    //Defining the array of values of filter group
    let groupValues = filters[name];
    console.log("array of filter group val before changed: ", groupValues);

    if (checked) {
      if (!groupValues.includes(value)) {
        groupValues.push(value);
      }
      console.log("groupValues after push: ", groupValues);
    } else {
      groupValues = groupValues.filter((item) => item !== value);
      console.log("the array of values of filter group is: ", groupValues);
    }

    const newFilters = { ...filters, [name]: groupValues };

    console.log("value of state filters after group change: ", newFilters);
    setFilters(newFilters);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  const applyFilters = async (filter) => {
    await handleFilter();
    setIsFilterVisible(false);
  };

  return (
    <div className={styles.filterWrapper}>
      <h2
        className={styles.filterButton}
        onClick={() => {
          setIsFilterVisible(!isFilterVisible);
        }}
      >
        {isFilterVisible ? <CloseFilterIcon /> : <FilterButtonIcon />} Filters
      </h2>
      {isFilterVisible && (
        <OutsideClickHandler onOutsideClick={handleClose}>
          <div
            className={`${styles.filterContainer} ${isFilterVisible ? styles.visible : styles.hidden}`}
          >
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel} htmlFor="hotPrices">
                <input
                  id="hotPrices"
                  type="checkbox"
                  name="discount"
                  checked={filters.discount}
                  onChange={handleCheckboxChange}
                />
                <span className={styles.checkmark}></span>
                <span className={styles.labelText}>Hot prices only</span>
              </label>
              <label className={styles.checkboxLabel} htmlFor="inStock">
                <input
                  id="inStock"
                  type="checkbox"
                  name="available"
                  checked={filters.available}
                  onChange={handleCheckboxChange}
                />
                <span className={styles.checkmark}></span>
                <span className={styles.labelText}>In stock only</span>
              </label>
            </div>

            <div className={styles.filterGroupContainer}>
              <h3
                className={styles.filterGroupHeader}
                onClick={() => toggleAccordion("price")}
              >
                Price
              </h3>
              {activeId === "price" && (
                <div className={styles.priceFilter} id="price">
                  {/* Min Price: */}
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleInputChange}
                    className={styles.priceInput}
                  />
                  <span>-</span>
                  {/* <label> */}
                  {/* Max Price: */}
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleInputChange}
                    className={styles.priceInput}
                  />
                  {/* </label> */}
                </div>
              )}
            </div>

            <div className={styles.filterGroupContainer}>
              <h3
                className={styles.filterGroupHeader}
                onClick={() => toggleAccordion("model")}
              >
                Model Line
              </h3>
              {activeId === "model" && (
                <div className={styles.checkboxGroup} id="model">
                  <label className={styles.checkboxLabel} htmlFor="iPhone 13">
                    <input
                      id="iPhone 13"
                      type="checkbox"
                      name="modelName"
                      value="iPhone 13"
                      checked={filters.modelName.includes("iPhone 13")}
                      onChange={(e) => handleGroupCheckboxChange(e)}
                    />
                    <span className={styles.checkmark}></span>
                    <span className={styles.labelText}>iPhone 13</span>
                  </label>

                  <label htmlFor="iPhone 14" className={styles.checkboxLabel}>
                    <input
                      id="iPhone 14"
                      type="checkbox"
                      name="modelName"
                      value="iPhone 14"
                      checked={filters.modelName.includes("iPhone 14")}
                      onChange={(e) => handleGroupCheckboxChange(e)}
                    />
                    <span className={styles.checkmark}></span>
                    <span className={styles.labelText}>iPhone 14</span>
                  </label>

                  <label
                    htmlFor="iPhone 14 Pro"
                    className={styles.checkboxLabel}
                  >
                    <input
                      id="iPhone 14 Pro"
                      type="checkbox"
                      name="modelName"
                      value="iPhone 14 Pro"
                      checked={filters.modelName.includes("iPhone 14 Pro")}
                      onChange={(e) => handleGroupCheckboxChange(e)}
                    />
                    <span className={styles.checkmark}></span>
                    <span className={styles.labelText}>iPhone 14 Pro</span>
                  </label>
                  <label
                    htmlFor="iPhone 14 Pro Max"
                    className={styles.checkboxLabel}
                  >
                    <input
                      id="iPhone 14 Pro Max"
                      type="checkbox"
                      name="modelName"
                      value="iPhone 14 Pro Max"
                      checked={filters.modelName.includes("iPhone 14 Pro Max")}
                      onChange={(e) => handleGroupCheckboxChange(e)}
                    />
                    <span className={styles.checkmark}></span>
                    <span className={styles.labelText}>iPhone 14 Pro Max</span>
                  </label>
                  <label htmlFor="iPhone 15" className={styles.checkboxLabel}>
                    <input
                      id="iPhone 15"
                      type="checkbox"
                      name="modelName"
                      value="iPhone 15"
                      checked={filters.modelName.includes("iPhone 15")}
                      onChange={(e) => handleGroupCheckboxChange(e)}
                    />
                    <span className={styles.checkmark}></span>
                    <span className={styles.labelText}>iPhone 15</span>
                  </label>
                  <label
                    htmlFor="iPhone 15 Pro"
                    className={styles.checkboxLabel}
                  >
                    <input
                      id="iPhone 15 Pro"
                      type="checkbox"
                      name="modelName"
                      value="iPhone 15 Pro"
                      checked={filters.modelName.includes("iPhone 15 Pro")}
                      onChange={(e) => handleGroupCheckboxChange(e)}
                    />
                    <span className={styles.checkmark}></span>
                    <span className={styles.labelText}>iPhone 15 Pro</span>
                  </label>
                  <label
                    htmlFor="iPhone 15 Pro Max"
                    className={styles.checkboxLabel}
                  >
                    <input
                      id="iPhone 15 Pro Max"
                      type="checkbox"
                      name="modelName"
                      value="iPhone 15 Pro Max"
                      checked={filters.modelName.includes("iPhone 15 Pro Max")}
                      onChange={(e) => handleGroupCheckboxChange(e)}
                    />
                    <span className={styles.checkmark}></span>
                    <span className={styles.labelText}>iPhone 15 Pro Max</span>
                  </label>
                </div>
              )}
            </div>
            {/* colors: black, blue, gold, green, grey, midnight, pink, purple, silver, starlight titanium, titanium grey, red, white, yellow  */}

            <div className={styles.filterGroupContainer}>
              <h3 className={styles.filterGroupHeader}>Color</h3>
              <div className={styles.checkboxGroup}>
                <label htmlFor="black" className={styles.checkboxLabel}>
                  <input
                    id="black"
                    type="checkbox"
                    name="color"
                    value="black"
                    checked={filters.color.includes("black")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>black</span>
                </label>

                <label htmlFor="blue" className={styles.checkboxLabel}>
                  <input
                    id="blue"
                    type="checkbox"
                    name="color"
                    value="blue"
                    checked={filters.color.includes("blue")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>blue</span>
                </label>

                <label htmlFor="gold" className={styles.checkboxLabel}>
                  <input
                    id="gold"
                    type="checkbox"
                    name="color"
                    value="gold"
                    checked={filters.color.includes("gold")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>gold</span>
                </label>

                <label htmlFor="green" className={styles.checkboxLabel}>
                  <input
                    id="green"
                    type="checkbox"
                    name="color"
                    value="green"
                    checked={filters.color.includes("green")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>green</span>
                </label>

                <label htmlFor="grey" className={styles.checkboxLabel}>
                  <input
                    id="grey"
                    type="checkbox"
                    name="color"
                    value="grey"
                    checked={filters.color.includes("grey")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>grey</span>
                </label>

                <label htmlFor="midnight" className={styles.checkboxLabel}>
                  <input
                    id="midnight"
                    type="checkbox"
                    name="color"
                    value="midnight"
                    checked={filters.color.includes("midnight")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>midnight</span>
                </label>

                <label htmlFor="pink" className={styles.checkboxLabel}>
                  <input
                    id="pink"
                    type="checkbox"
                    name="color"
                    value="pink"
                    checked={filters.color.includes("pink")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>pink</span>
                </label>

                <label htmlFor="purple" className={styles.checkboxLabel}>
                  <input
                    id="purple"
                    type="checkbox"
                    name="color"
                    value="purple"
                    checked={filters.color.includes("purple")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>purple</span>
                </label>

                <label htmlFor="silver" className={styles.checkboxLabel}>
                  <input
                    id="silver"
                    type="checkbox"
                    name="color"
                    value="silver"
                    checked={filters.color.includes("silver")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>silver</span>
                </label>

                <label htmlFor="starlight" className={styles.checkboxLabel}>
                  <input
                    id="starlight"
                    type="checkbox"
                    name="color"
                    value="starlight"
                    checked={filters.color.includes("starlight")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>starlight</span>
                </label>

                <label htmlFor="titanium" className={styles.checkboxLabel}>
                  <input
                    id="titanium"
                    type="checkbox"
                    name="color"
                    value="titanium"
                    checked={filters.color.includes("titanium")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>titanium</span>
                </label>

                <label htmlFor="titanium grey" className={styles.checkboxLabel}>
                  <input
                    id="titanium grey"
                    type="checkbox"
                    name="color"
                    value="titanium grey"
                    checked={filters.color.includes("titanium grey")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>titanium grey</span>
                </label>

                <label htmlFor="red" className={styles.checkboxLabel}>
                  <input
                    id="red"
                    type="checkbox"
                    name="color"
                    value="red"
                    checked={filters.color.includes("red")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>red</span>
                </label>

                <label htmlFor="white" className={styles.checkboxLabel}>
                  <input
                    id="white"
                    type="checkbox"
                    name="color"
                    value="white"
                    checked={filters.color.includes("white")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>white</span>
                </label>

                <label htmlFor="yellow" className={styles.checkboxLabel}>
                  <input
                    id="yellow"
                    type="checkbox"
                    name="color"
                    value="yellow"
                    checked={filters.color.includes("yellow")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>yellow</span>
                </label>
              </div>
            </div>

            <div className={styles.filterGroupContainer}>
              <h3 className={styles.filterGroupHeader}>Capacity</h3>
              <div className={styles.checkboxGroup}>
                <label htmlFor="128GB" className={styles.checkboxLabel}>
                  <input
                    id="128GB"
                    type="checkbox"
                    name="capacity"
                    value="128"
                    checked={filters.capacity.includes("128")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>128 GB</span>
                </label>

                <label htmlFor="256GB" className={styles.checkboxLabel}>
                  <input
                    id="256GB"
                    type="checkbox"
                    name="capacity"
                    value="256"
                    checked={filters.capacity.includes("256")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>256 GB</span>
                </label>

                <label htmlFor="512GB" className={styles.checkboxLabel}>
                  <input
                    id="512GB"
                    type="checkbox"
                    name="capacity"
                    value="512"
                    checked={filters.capacity.includes("512")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>512 GB</span>
                </label>

                <label htmlFor="1024GB" className={styles.checkboxLabel}>
                  <input
                    id="1024GB"
                    type="checkbox"
                    name="capacity"
                    value="1024"
                    checked={filters.capacity.includes("1024")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>1024 GB</span>
                </label>
              </div>
            </div>

            <div className={styles.filterGroupContainer}>
              <h3 className={styles.filterGroupHeader}>RAM</h3>
              <div className={styles.checkboxGroup}>
                <label htmlFor="6GB" className={styles.checkboxLabel}>
                  <input
                    id="6GB"
                    type="checkbox"
                    name="ram"
                    value="6"
                    checked={filters.ram.includes("6")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>6 GB</span>
                </label>

                <label htmlFor="8GB" className={styles.checkboxLabel}>
                  <input
                    id="8GB"
                    type="checkbox"
                    name="ram"
                    value="8"
                    checked={filters.ram.includes("8")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>8 GB</span>
                </label>
              </div>
            </div>

            <div className={styles.filterGroupContainer}>
              <h3 className={styles.filterGroupHeader}>Screen</h3>
              <div className={styles.checkboxGroup}>
                <label htmlFor="6.1" className={styles.checkboxLabel}>
                  <input
                    id="6.1"
                    type="checkbox"
                    name="screen"
                    value="6.1"
                    checked={filters.screen.includes("6.1")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>6.1&quot;</span>
                </label>

                <label htmlFor="6.7" className={styles.checkboxLabel}>
                  <input
                    id="6.7"
                    type="checkbox"
                    name="screen"
                    value="6.7"
                    checked={filters.screen.includes("6.7")}
                    onChange={(e) => handleGroupCheckboxChange(e)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>6.7&quot;</span>
                </label>
              </div>
            </div>

            <div className={styles.filterButtonsContainer}>
              <button
                onClick={applyFilters}
                className={styles.filterActionButton}
              >
                Apply
              </button>
              <button
                onClick={clearFilters}
                className={styles.filterActionButton}
              >
                <ClearFiltersIcon /> Clear
              </button>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
    // </div>
  );
};

Filter.propTypes = {
  // children: PropTypes.any,
  // onOutsideClick: PropTypes.func,
  handleFilter: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    discount: PropTypes.bool.isRequired,
    available: PropTypes.bool.isRequired,
    minPrice: PropTypes.string.isRequired,
    maxPrice: PropTypes.string.isRequired,
    modelName: PropTypes.arrayOf(PropTypes.string).isRequired,
    capacity: PropTypes.arrayOf(PropTypes.string).isRequired,
    color: PropTypes.arrayOf(PropTypes.string).isRequired,
    ram: PropTypes.arrayOf(PropTypes.string).isRequired,
    screen: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  setFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default Filter;
