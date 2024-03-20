import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSearchList } from "../../store/search/searchSlice";
import SearchLogo from "../Icons/SearchLogo";

import styles from "./SearchForm.module.scss";
import PropTypes from "prop-types";

const SearchForm = ({ toggleBurger }) => {
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShow = () => {
    setShowInput(true);
  };
  const handleBlur = () => {
    setShowInput(false);
  };

  const handleInputChange = (event) => {
    navigate("/search");
    dispatch(getSearchList(event.target.value));
  };

  const handleSubmit = (event) => {
    toggleBurger();
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onMouseOver={handleShow}
      onMouseOut={handleBlur}
      onBlur={handleBlur}
      className={styles.searchForm}
    >
      <SearchLogo isActive={showInput} />
      {showInput && (
        <input
          type="text"
          placeholder="Search ..."
          className={styles.searchInput}
          onChange={handleInputChange}
        />
      )}
    </form>
  );
};

SearchForm.propTypes = {
  toggleBurger: PropTypes.func,
};
export default SearchForm;
