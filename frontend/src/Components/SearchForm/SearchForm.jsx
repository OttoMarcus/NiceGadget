import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { getSearchList } from "../../store/search/searchSlice";
import SearchLogo from "../Icons/SearchLogo";

import styles from "./SearchForm.module.scss";


const SearchForm = () => {
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShow = () => {
    setShowInput(true);
    navigate("/search");

  };
  const handleBlur = () => {
    setShowInput(false);
  };

  const handleInputChange = (event) => {
    dispatch(getSearchList(event.target.value));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      onMouseOver={handleShow}
      onMouseOut={handleBlur}
      onBlur={handleBlur}
      onFocus={handleShow}
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

export default SearchForm;