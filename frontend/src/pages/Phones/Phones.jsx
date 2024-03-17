import React, { useState, useEffect } from "react";
// import styles from "./Phones.module.scss";
import Card from "../../Components/Card/Card";
import Sort from "../../Components/Sort/Sort";
import PerPageSelect from "../../Components/PerPageSelect/PerPageSelect";
import Pagination from "../../Components/Pagination/Pagination";
import { useLocation, useSearchParams } from "react-router-dom";
import styles from "../Phones/Phones.module.scss";

const Phones = () => {
  const [phonesArr, setPhonesArr] = useState();

  const [sortValue, setSortValue] = useState("");
  const [cardsPerPageValue, setCardsPerPageValue] = useState(8);
  const [totalPages, setTotalPages] = useState();
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
    const preferencesPerPage = localStorage.getItem("cardsPerPage") || 8;
    setCardsPerPageValue(preferencesPerPage);

    const urlParams = new URLSearchParams(window.location.search);
    const sortParam = urlParams.get("sort");
    const defaultSortValue = "-brandNew";
    if (sortParam) {
      setSortValue(sortParam);
    } else {
      setSortValue(defaultSortValue);
      // const currentUrl = new URL(window.location);
      // currentUrl.searchParams.set("sort", defaultSortValue)
      // window.history.pushState({}, "", currentUrl.toString())
    }

    const fetchURL = sortParam
      ? `http://localhost:4000/api/phones?sort=${sortParam}&perPage=${cardsPerPageValue}&startPage=${currentPage}`
      : `http://localhost:4000/api/phones?sort=${defaultSortValue}&perPage=${cardsPerPageValue}&startPage=${currentPage}`;

    fetch(fetchURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(({ data }) => {
        setPhonesArr(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, []);

  const handleSortChange = async (e) => {
    e.preventDefault();
    const newSortValue = e.target.value;
    // console.log(`newSortValue: ${newSortValue}`);

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
      .then(({ data }) => {
        // setSortedPhones(data);
        setPhonesArr(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    // else if (newSortValue === "All") {
    //   await fetch("http://localhost:4000/api/phones")
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then(({ data }) => {
    //     // setSortedPhones(data);
    //     setPhonesArr(data)
    //   })
    //   .catch((error) => {
    //     console.error("There was a problem with your fetch operation:", error);
    //   });
    // }

    // } else {
    //   currentUrl.searchParams.delete("sort");
    // }
    // window.history.pushState({}, "", currentUrl.toString());
    setSortValue(newSortValue);
  };

  const handlePerPageChange = async (e) => {
    e.preventDefault();
    const newPerPageValue = e.target.value;
    // console.log(`newSortValue: ${newSortValue}`);

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
      .then(({ data }) => {
        setPhonesArr(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    setCardsPerPageValue(newPerPageValue);
  };

  return (
    <>
      <h1 className={styles.pageTitle}>Mobile phones</h1>
      <Sort handleSortChange={handleSortChange} sortValue={sortValue} />
      <PerPageSelect
        handlePerPageChange={handlePerPageChange}
        cardsPerPageValue={cardsPerPageValue}
      />
      <div className={`${styles.container} ${styles.categoryWrapper}`}>
        {phonesArr &&
          phonesArr.map((card) => {
            return (
              <Card
                picture={card.picture}
                name={card.name}
                price={card.price}
                key={card.id}
                color={card.color}
                refModel={card.refModel}
                brandNew={card.brandNew}
                capacity={card.capacity}
                ram={card.ram}
                screen={card.screen}
                available={card.available}
                id={card.id}
                category={typeModel}
              />
            );
          })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Phones;
