import React, { useState } from "react";
import SearchLogo from "../Icons/SearchLogo";
import styles from "./SearchForm.module.scss";

const SearchForm = () => {
  const [showInput, setShowInput] = useState(false);

  const handleShow = () => {
    setShowInput(true);
  };
  const handleBlur = () => {
    setShowInput(false);
  };

  return (
    <form
      action=""
      onClick={handleShow}
      // onMouseOver={handleShow}
      onBlur={handleBlur}
      className={styles.searchForm}
    >
      <SearchLogo isActive={showInput} />
      {showInput && (
        <input
          type="text"
          placeholder="Search ..."
          className={styles.searchInput}
        />
      )}
    </form>
  );
};

export default SearchForm;
