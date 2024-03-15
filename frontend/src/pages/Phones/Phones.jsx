import React, { useState, useEffect } from "react";
// import styles from "./Phones.module.scss";
import Card from "../../Components/Card/Card";
import Filter from "../../Components/Filter/Filter";
import { useLocation, useSearchParams } from "react-router-dom";
import styles from "../Phones/Phones.module.scss";

const Phones = () => {
  const [phonesArr, setPhonesArr] = useState();

  const [sortValue, setSortValue] = useState("");
  const [cardsPerPage, setCardsPerPage] = useState(8);

  const [searchParams, setSearchParams] = useSearchParams();
  // const [sortedPhones, setSortedPhones] = useState();

  const location = useLocation();
  const typeModel = location.pathname.slice(1);

  // useEffect(() => {
  //   fetch("http://localhost:4000/api/phones")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then(({ data }) => {
  //       setPhonesArr(data);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with your fetch operation:", error);
  //     });
  // }, []);

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
    setCardsPerPage(preferencesPerPage);

    const urlParams = new URLSearchParams(window.location.search);
    const sortParam = urlParams.get("sort");
    const fetchURL = sortParam
      ? `http://localhost:4000/api/phones?sort=${sortParam}&perPage=${cardsPerPage}&startPage=1`
      : `http://localhost:4000/api/phones?perPage=${cardsPerPage}&startPage=1`;

    if (sortParam) {
      setSortValue(sortParam);
    }

    fetch(fetchURL)
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
  }, []);

  const handleSortChange = async (e) => {
    e.preventDefault();
    const newSortValue = e.target.value;
    // console.log(`newSortValue: ${newSortValue}`);

    const currentUrl = new URL(window.location);

    currentUrl.searchParams.set("sort", newSortValue);
    await fetch(
      `http://localhost:4000/api/phones?sort=${newSortValue}&perPage=${cardsPerPage}&startPage=1`
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

    // const sortedProducts = await serverSortResponse.data;
    //   console.log(sortedProducts);

    // setSortedPhones(sortedProducts);

    // } else {
    //   currentUrl.searchParams.delete("sort");
    // }
    window.history.pushState({}, "", currentUrl.toString());

    setSortValue(newSortValue);

    // const serverSortResponse = await fetch(
    //   `http://localhost:4000/api/phones?sort=${newSortValue}&perPage=8&startPage=1`
    // ).then((res) => res.json())

    // console.log(sortedProducts);
    // .then((data) => setSortedPhones(sortedProducts))

    // const sortedProducts = await serverSortResponse.data;
    //   console.log(sortedProducts);

    // setSortedPhones(sortedProducts);
  };

  return (
    <>
      <h1 className={styles.pageTitle}>Mobile phones</h1>
      <Filter handleSortChange={handleSortChange} sortValue={sortValue} />
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
    </>
  );
};

export default Phones;
