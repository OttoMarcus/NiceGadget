import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../Components/Card/Card";
import Sort from "../../Components/Sort/Sort";
import PerPageSelect from "../../Components/PerPageSelect/PerPageSelect";
import Pagination from "../../Components/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import styles from "./Phones.module.scss";

const Phones = () => {
  const [phonesArr, setPhonesArr] = useState();

  const [sortValue, setSortValue] = useState("");
  const [totalNumber, setTotalNumber] = useState();
  const [cardsPerPageValue, setCardsPerPageValue] = useState(8);
  const [totalPages, setTotalPages] = useState();
  const [totalMatching, setTotalMatching] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const typeModel = location.pathname.slice(1);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const sort = urlParams.get("sort");

  //   // console.log(`urlParams + ${urlParams}`);
  //   // console.log(`sort + ${sort}`);
  //   // console.log(`searchParams + ${searchParams}`);

  //   if (sort) {
  //     setSortValue(sort);
  //   }
  // }, [searchParams]);

  useEffect(() => {
    const preferencesPerPage = localStorage?.getItem("cardsPerPage") || 8;
    setCardsPerPageValue(preferencesPerPage);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams) {
      console.log("urlParams present!");
    }

    const sortParam = urlParams.get("sort");
    const perPageParam = urlParams.get("perPage");
    const currentPageParam = urlParams.get("startPage");

    const defaultSortValue = "-brandNew";
    const reqPerPage = perPageParam ? perPageParam : preferencesPerPage;

    if (sortParam) {
      setSortValue(sortParam);
    } else {
      setSortValue(defaultSortValue);
      // const currentUrl = new URL(window.location);
      // currentUrl.searchParams.set("sort", defaultSortValue)
      // window.history.pushState({}, "", currentUrl.toString())
    }

    const fetchURL = sortParam
      ? `http://localhost:4000/api/phones?sort=${sortParam}&perPage=${reqPerPage}&startPage=${currentPage}`
      : `http://localhost:4000/api/phones?sort=${defaultSortValue}&perPage=${reqPerPage}&startPage=${currentPage}`;

    fetch(fetchURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(({ data, totalPages, totalMatching, total }) => {
        setPhonesArr(data);
        setTotalNumber(total);
        setTotalPages(totalPages);
        setTotalMatching(totalMatching);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, []);

  const handleSortChange = async (newSortValue) => {
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set("sort", newSortValue);
    currentUrl.searchParams.set("perPage", cardsPerPageValue);
    currentUrl.searchParams.set("startPage", "1");
    window.history.pushState({}, "", currentUrl.toString());

    await fetch(
      `http://localhost:4000/api/phones?sort=${newSortValue}&perPage=${cardsPerPageValue}&startPage=1`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(({ data, totalPages, totalMatching, total }) => {
        setPhonesArr(data);
        setTotalNumber(total);
        setTotalPages(totalPages);
        setTotalMatching(totalMatching);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    setSortValue(newSortValue);
  };

  const handlePerPageChange = async (newPerPageValue) => {
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set("perPage", newPerPageValue);
    currentUrl.searchParams.set("startPage", "1");
    window.history.pushState({}, "", currentUrl.toString());

    await fetch(
      `http://localhost:4000/api/phones?sort=${sortValue}&perPage=${newPerPageValue}&startPage=1`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(({ data, totalPages, totalMatching, total }) => {
        setPhonesArr(data);
        setTotalNumber(total);
        setTotalPages(totalPages);
        setTotalMatching(totalMatching);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    setCardsPerPageValue(newPerPageValue);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  return (
    <article className={styles.container}>
      <h1 className={styles.phonesTitle}>Mobile phones</h1>
      <h3 className={styles.subtitle}>models</h3>

      <div className={styles.selectsContainer}>
        <Sort handleSortChange={handleSortChange} sortValue={sortValue} />
        <PerPageSelect
          handlePerPageChange={handlePerPageChange}
          cardsPerPageValue={cardsPerPageValue}
        />
      </div>

      <div className={styles.resultWrapper}>
        {Array.isArray(phonesArr) &&
          phonesArr.map((item) => (
            <Card key={item.id} category={typeModel} {...item} />
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </article>
  );
};

export default Phones;
