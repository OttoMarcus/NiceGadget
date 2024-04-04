import React, { useState, useEffect, useRef } from "react";
// import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import FilterButtonIcon from "../Icons/FilterButtonIcon";
import ClearFiltersIcon from "../Icons/ClearFiltersIcon";
import DownArrowIcon from "../Icons/DownArrowIcon";
import UpArrowIcon from "../Icons/UpArrowIcon";
import styles from "./Filter.module.scss";
import PropTypes from "prop-types";
import CloseFilterIcon from "../Icons/CloseFilterIcon";

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
  const [activeSection, setActiveSection] = useState(null);
  const [serverFilters, setServerFilters] = useState(null);

  useEffect(() => {
    // Fetch data from server
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:4000/api/phones-filters"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setServerFilters(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchData();
  }, []);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleClose = () => {
    setIsFilterVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  //   const handleGroupCheckboxChange = (e) => {
  //     console.log(filters[e.target.name].includes(e.target.value));
  //     const { name, checked, value } = e.target;

  //     //Defining the array of values of filter group
  //     let groupValues = filters[name];
  //     console.log("array of filter group val before changed: ", groupValues);

  //     if (checked) {
  //       if (!groupValues.includes(value)) {
  //         groupValues.push(value);
  //       }
  //       console.log("groupValues after push: ", groupValues);
  //     } else {
  //       groupValues = groupValues.filter((item) => item !== value);
  //       console.log("the array of values of filter group is: ", groupValues);
  //     }

  //     const newFilters = { ...filters, [name]: groupValues };

  //     console.log("value of state filters after group change: ", newFilters);
  //     setFilters(newFilters);
  //   };

  const applyFilters = async () => {
    await handleFilter();
    setIsFilterVisible(false);
  };

  return (
    <div className={styles.filterWrapper}>
      <h2 className={styles.filterButton} onClick={toggleFilterVisibility}>
        {isFilterVisible ? <CloseFilterIcon /> : <FilterButtonIcon />} Filters
      </h2>
      {isFilterVisible && (
        <OutsideClickHandler onOutsideClick={handleClose}>
          <div
            className={`${styles.filterContainer} ${isFilterVisible ? styles.visible : styles.hidden}`}
          >
            {serverFilters &&
              Object.keys(serverFilters).map((key) => (
                <div key={key} className={styles.filterGroupContainer}>
                  <h3
                    className={styles.filterGroupHeader}
                    onClick={() => toggleSection(key)}
                  >
                    {key}
                    {activeSection === key ? (
                      <UpArrowIcon />
                    ) : (
                      <DownArrowIcon />
                    )}
                  </h3>
                  {activeSection === key && (
                    <div className={styles.filterContent}>
                      {Array.isArray(serverFilters[key]) ? (
                        <ul>
                          {serverFilters[key].map((item) => (
                            <li key={item}>
                              {console.log(item)}
                              <label className={styles.checkboxLabel}>
                                <input
                                  type="checkbox"
                                  name={key}
                                  value={item}
                                  // checked={filters[key].includes(item)}
                                  onChange={handleCheckboxChange}
                                />
                                <span className={styles.checkmark}></span>
                                <span className={styles.labelText}>
                                  {key === "capacity" || key === "RAM"
                                    ? `${item} GB`
                                    : `${item}`}
                                </span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className={styles.priceFilter}>
                          <input
                            type="number"
                            name="minPrice"
                            value={
                              serverFilters[key].minPrice || filters?.minPrice
                            }
                            onChange={handleInputChange}
                            className={styles.priceInput}
                          />
                          <span>-</span>
                          <input
                            type="number"
                            name="maxPrice"
                            value={
                              serverFilters[key].maxPrice || filters?.maxPrice
                            }
                            onChange={handleInputChange}
                            className={styles.priceInput}
                          />
                          <input
                            type="range"
                            min={serverFilters[key].minPrice}
                            max={serverFilters[key].maxPrice}
                            value={filters[key]?.maxPrice}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
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
