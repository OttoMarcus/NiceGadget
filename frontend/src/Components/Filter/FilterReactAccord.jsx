import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import FilterButtonIcon from "../Icons/FilterButtonIcon";
import ClearFiltersIcon from "../Icons/ClearFiltersIcon";
import DownArrowIcon from "../Icons/DownArrowIcon";
import UpArrowIcon from "../Icons/UpArrowIcon";

// import queryString from "query-string";
import styles from "./Filter.module.scss";
import PropTypes from "prop-types";
import CloseFilterIcon from "../Icons/CloseFilterIcon";

/*
TO DO:
1. Set default min-max price
2. Parse values from URL to filter states - done
3. Add filter groups hide and reveal on group header click - done
4. Add accordeon logic
5. Input range?
6. Clear button - done
7. Display number of items found
8. Display numer of items per each option?
9. Fix position of buttons, add scroll for filters.
10. Add MEMO
11. Close filters on backdrop click
12. Add URL change on clear filters (remove filters)
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
            `{" "}
            <Accordion>
              <AccordionItem
                header={<h3 className={styles.filterGroupHeader}>Price</h3>}
              >
                <div className={styles.priceFilter} id="price">
                  {/* Min Price: */}
                  <input
                    type="text"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleInputChange}
                    className={styles.priceInput}
                  />
                  <span>-</span>
                  {/* <label> */}
                  {/* Max Price: */}
                  <input
                    type="text"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleInputChange}
                    className={styles.priceInput}
                  />
                  {/* </label> */}
                </div>
              </AccordionItem>

              <AccordionItem
                header={
                  <h3 className={styles.filterGroupHeader}>Model Line</h3>
                }
              >
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
              </AccordionItem>

              <AccordionItem></AccordionItem>

              <AccordionItem></AccordionItem>
            </Accordion>
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
