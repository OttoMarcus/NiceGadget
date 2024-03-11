import React, { useState } from "react";
import axios from "axios";
import Card from "../../Components/Card/Card";
import backConnectionString from "../../helpers/backConnectionString";

import styles from "./Search.module.scss";
const Search = () => {
  const [searchList, setSearchList] = useState([]);
  const searchResult = () => {
    axios.get(`http://localhost:4000/api/phones`).then((response) => {
      setSearchList(response.data);
    });
  };

  searchResult();

  return (
    <>
      <article className={styles.container}>
        <h1 className={styles.searchTitle}>Search result</h1>
        <h3 className={styles.searchCategory}>category:</h3>
        <div className={styles.resultWrapper}>
          {/*{*/}
          {/*  searchResult.map((item, index) => {*/}
          {/*    return (*/}
          {/*      <Card key={index} id={item.id} picture={item.picture} name={item.name} price={item.price} refModel={item.refModel} color={item.color} available={item.available} />*/}
          {/*    )*/}
          {/*  })*/}
          {/*}*/}
        </div>
      </article>
    </>
  );
};

export default Search;
