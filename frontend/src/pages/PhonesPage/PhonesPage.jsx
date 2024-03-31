import React, { useState, useEffect } from "react";
import Card from "../../Components/Cards/Card";
import Sort from "../../Components/Sort/Sort";
import LeftArrowIcon from "../../Components/Icons/LeftArrowIcon";
import RightArrowIcon from "../../Components/Icons/RightArrowIcon";
import PerPageSelect from "../../Components/PerPageSelect/PerPageSelect";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";
import styles from "./PhonesPage.module.scss";

const PhonesPage = () => {
  const [phonesArr, setPhonesArr] = useState();

  const [sortValue, setSortValue] = useState("-brandNew");
  const [cardsPerPageValue, setCardsPerPageValue] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalNumber, setTotalNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const typeModel = location.pathname.slice(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sort = urlParams.get("sort");
    const perPage = urlParams.get("perPage");
    const startPage = urlParams.get("startPage");

    setSortValue(sort || "-brandNew");
    setCardsPerPageValue(perPage ? Number(perPage) : 8);
    setCurrentPage(startPage ? Number(startPage) : 1);
  }, []);

  const fetchData = async (sortValue, cardsPerPageValue, currentPage) => {
    try {
      const res = await fetch(
        `/api/phones?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${currentPage}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const { data, totalPages, total } = await res.json();
      setPhonesArr(data);
      setTotalNumber(Number(total));
      setTotalPages(Number(totalPages));
      // setTotalMatching(totalMatching);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchData(sortValue, cardsPerPageValue, currentPage);
  }, [sortValue, cardsPerPageValue, currentPage]);

  const handleSortChange = async (newSortValue) => {
    const currentUrl = new URL(window.location);

    currentUrl.searchParams.set("sort", newSortValue);
    currentUrl.searchParams.set("perPage", cardsPerPageValue);
    const newCurrentPage = 1;
    setCurrentPage(newCurrentPage);
    currentUrl.searchParams.set("startPage", newCurrentPage);
    window.history.pushState({}, "", currentUrl.toString());

    setSortValue(newSortValue);
  };

  const handlePerPageChange = async (newPerPageValue) => {
    const currentUrl = new URL(window.location);

    currentUrl.searchParams.set("sort", sortValue);
    currentUrl.searchParams.set("perPage", newPerPageValue);
    const newCurrentPage = 1;
    currentUrl.searchParams.set("startPage", newCurrentPage);
    window.history.pushState({}, "", currentUrl.toString());

    setCurrentPage(newCurrentPage);
    setCardsPerPageValue(Number(newPerPageValue));
  };

  const handlePageChange = async ({ selected }) => {
    const newPage = selected + 1;
    const currentUrl = new URL(window.location);

    currentUrl.searchParams.set("sort", sortValue);
    currentUrl.searchParams.set("perPage", cardsPerPageValue);
    currentUrl.searchParams.set("startPage", newPage);
    window.history.pushState({}, "", currentUrl.toString());

    setCurrentPage(Number(newPage));
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

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          breakLabel="..."
          breakLinkClassName={styles.break}
          nextLabel={<RightArrowIcon />}
          nextLinkClassName={styles.nextPageLink}
          previousLabel={<LeftArrowIcon />}
          previousLinkClassName={styles.prevPageLink}
          containerClassName={styles.pagination}
          pageClassName={styles.paginationItem}
          activeClassName={styles.active}
          pageLinkClassName={styles.paginationItemLink}
        />
      )}
    </article>
  );
};

export default PhonesPage;
