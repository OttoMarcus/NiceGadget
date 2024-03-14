import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Card/Card";

import styles from "./Search.module.scss";

const Search = () => {
  const [searchList, setSearchList] = useState({ data: [] });

  useEffect(() => {
    searchResult();
  }, []);

  const searchResult = () => {
    axios
      .get(`http://localhost:4000/api/phones`)
      .then((response) => {
        setSearchList({ data: response.data.data });
      })
      .catch((error) => {
        console.error("Fetching error:", error);
      });
  };

  return (
    <article className={styles.container}>
      <h1 className={styles.searchTitle}>Search result</h1>
      <h3 className={styles.searchCategory}>category:</h3>
      <div className={styles.resultWrapper}>
        {Array.isArray(searchList.data) &&
          searchList.data.map((item) => <Card key={item.id} {...item} />)}
      </div>
    </article>
  );
};

export default Search;
