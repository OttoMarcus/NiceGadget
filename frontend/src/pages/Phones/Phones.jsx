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

  const [sortValue, setSortValue] = useState("-brandNew");
  const [cardsPerPageValue, setCardsPerPageValue] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalNumber, setTotalNumber] = useState(0);
  const [totalMatching, setTotalMatching] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

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
    // const preferencesPerPage = localStorage?.getItem("cardsPerPage") || 8;
    // setCardsPerPageValue(preferencesPerPage);

    // ===================================

    // const urlParams = new URLSearchParams(window.location.search);
    // if (urlParams) {
    //   console.log("urlParams present!");
    //   setSortValue(urlParams?.get("sort"))
    //   setCardsPerPageValue(urlParams?.get("perPage"))
    //   setCurrentPage(urlParams?.get("startPage"))
    // }

    // ===================================

    // const sortParam = urlParams.get("sort");
    // const perPageParam = urlParams.get("perPage");
    // const currentPageParam = urlParams.get("startPage");

    // const defaultPerPage = 8;
    // const defaultSortValue = "-brandNew";
    // const reqPerPage = perPageParam ? perPageParam : preferencesPerPage;

    // if (sortParam) {
    //   setSortValue(sortParam);
    // } else {
    //   setSortValue(defaultSortValue);
    //   // const currentUrl = new URL(window.location);
    //   // currentUrl.searchParams.set("sort", defaultSortValue)
    //   // window.history.pushState({}, "", currentUrl.toString())
    // }

    // const fetchURL = sortParam
    //   ? `http://localhost:4000/api/phones?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${currentPage}`
    //   : `http://localhost:4000/api/phones?sort=${defaultSortValue}&perPage=${reqPerPage}&startPage=${currentPage}`;

    fetch(
      `http://localhost:4000/api/phones?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${currentPage}`
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
  }, [sortValue, cardsPerPageValue, currentPage]);

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
    currentUrl.searchParams.set("sort", sortValue);
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

  const handlePageChange = async (e, page) => {
    // e.preventDefault()
    // const newPage = Number(page) + 1;
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set("sort", sortValue);
    currentUrl.searchParams.set("perPage", cardsPerPageValue);
    currentUrl.searchParams.set("startPage", page);
    window.history.pushState({}, "", currentUrl.toString());

    await fetch(
      `http://localhost:4000/api/phones?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${page}`
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

    setCurrentPage(page);
  };

  const handlePaginationArrowClick = async (e, currentPage, totalPages) => {
    // e.preventDefault()
    let newPage;
    if (e.target.id === "prev") {
      newPage = currentPage - 1 === 0 ? currentPage : currentPage - 1;
    } else if (e.target.id === "next") {
      newPage = currentPage + 1 > totalPages ? currentPage : currentPage + 1;
    }

    if (currentPage !== newPage) {
      const currentUrl = new URL(window.location);
      currentUrl.searchParams.set("sort", sortValue);
      currentUrl.searchParams.set("perPage", cardsPerPageValue);
      currentUrl.searchParams.set("startPage", newPage);
      window.history.pushState({}, "", currentUrl.toString());

      await fetch(
        `http://localhost:4000/api/phones?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${newPage}`
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
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });

      setCurrentPage(newPage);
    }

    // console.log(newPage);
    // handlePageChange(newPage)
    // const currentUrl = new URL(window.location);
    // currentUrl.searchParams.set("sort", sortValue);
    // currentUrl.searchParams.set("perPage", cardsPerPageValue);
    // currentUrl.searchParams.set("startPage", newPage);
    // window.history.pushState({}, "", currentUrl.toString());

    // await fetch(
    //   `http://localhost:4000/api/phones?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${newPage}`
    // )
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return res.json();
    //   })
    //   .then(({ data, totalPages, totalMatching, total }) => {
    //     setPhonesArr(data);
    //     setTotalNumber(total);
    //     setTotalPages(totalPages);
    //     setTotalMatching(totalMatching);
    //   })
    //   .catch((error) => {
    //     console.error("There was a problem with your fetch operation:", error);
    //   });

    // setCurrentPage(newPage);
  };

  return (
    <article className={styles.container}>
      <h1 className={styles.phonesTitle}>Mobile phones</h1>
      <h3 className={styles.subtitle}>{totalNumber} models</h3>

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
        handlePageChange={handlePageChange}
        handlePaginationArrowClick={handlePaginationArrowClick}
      />
    </article>
  );
};

export default Phones;
