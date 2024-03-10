import React from "react";
import SearchLogo from "../Icons/SearchLogo";

import styles from "./SearchForm.module.scss";

const SearchForm = () => {
  return (
    <form action="" className={styles.searchForm}>
      <input
        type="text"
        placeholder="Search ..."
        className={styles.searchInput}
      />
      <SearchLogo />
    </form>
  );
};

export default SearchForm;
