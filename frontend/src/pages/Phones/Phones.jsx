import React, { useState, useEffect } from "react";
// import axios from "axios";
import Card from "../../Components/Card/Card";
import Sort from "../../Components/Sort/Sort";
import Filter from "../../Components/Filter/Filter";
import LeftArrowIcon from "../../Components/Icons/LeftArrowIcon";
import RightArrowIcon from "../../Components/Icons/RightArrowIcon";
import PerPageSelect from "../../Components/PerPageSelect/PerPageSelect";
import ReactPaginate from "react-paginate";
// import Pagination from "../../Components/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import styles from "./Phones.module.scss";
import ReactFilters from "../../Components/Filter/Filter-react-filter";

const Phones = () => {
  const [phonesArr, setPhonesArr] = useState();

  const [sortValue, setSortValue] = useState("-brandNew");
  const [cardsPerPageValue, setCardsPerPageValue] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalNumber, setTotalNumber] = useState(0);
  // const [totalMatching, setTotalMatching] = useState(0);
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

  // useEffect(() => {
  //   fetch(
  //     `/api/phones?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${currentPage}`
  //   )
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return res.json();
  //     })
  //     .then(({ data, totalPages, totalMatching, total }) => {
  //       setPhonesArr(data);
  //       setTotalNumber(Number(total));
  //       setTotalPages(Number(totalPages));
  //       setTotalMatching(totalMatching);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with your fetch operation:", error);
  //     });
  //  }, [window.location.search])

  //   useEffect(() => {
  // // const preferencesPerPage = localStorage?.getItem("cardsPerPage") || 8;
  //     // setCardsPerPageValue(preferencesPerPage);

  //     // ===================================

  //     const urlParams = new URLSearchParams(window.location.search);
  //     console.log(urlParams.size === 0);
  //     if (urlParams !== 0) {
  //       // console.log("urlParams present!");
  //       setSortValue(urlParams?.get("sort"))
  //       setCardsPerPageValue(urlParams?.get("perPage"))
  //       setCurrentPage(urlParams?.get("startPage"))
  //     }

  //     // ===================================

  //     // const sortParam = urlParams.get("sort");
  //     // const perPageParam = urlParams.get("perPage");
  //     // const currentPageParam = urlParams.get("startPage");

  //     // const defaultPerPage = 8;
  //     // const defaultSortValue = "-brandNew";
  //     // const reqPerPage = perPageParam ? perPageParam : preferencesPerPage;

  //     // if (sortParam) {
  //     //   setSortValue(sortParam);
  //     // } else {
  //     //   setSortValue(defaultSortValue);
  //     //   // const currentUrl = new URL(window.location);
  //     //   // currentUrl.searchParams.set("sort", defaultSortValue)
  //     //   // window.history.pushState({}, "", currentUrl.toString())
  //     // }

  //     // const fetchURL = sortParam
  //     //   ? `/api/phones?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${currentPage}`
  //     //   : `/api/phones?sort=${defaultSortValue}&perPage=${reqPerPage}&startPage=${currentPage}`;
  //   }, [])

  // useEffect(() => {

  //   fetch(
  //     `/api/phones?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${currentPage}`
  //   )
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return res.json();
  //     })
  //     .then(({ data, totalPages, totalMatching, total }) => {
  //       setPhonesArr(data);
  //       setTotalNumber(Number(total));
  //       setTotalPages(Number(totalPages));
  //       setTotalMatching(totalMatching);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with your fetch operation:", error);
  //     });
  // }, []);

  // [sortValue, cardsPerPageValue, currentPage]

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
    // setCurrentPage(newCurrentPage)
    currentUrl.searchParams.set("startPage", newCurrentPage);
    window.history.pushState({}, "", currentUrl.toString());

    setCurrentPage(newCurrentPage);
    setCardsPerPageValue(Number(newPerPageValue));
  };

  const handlePageChange = async ({ selected }) => {
    // e.preventDefault()
    const newPage = selected + 1;
    const currentUrl = new URL(window.location);

    currentUrl.searchParams.set("sort", sortValue);
    currentUrl.searchParams.set("perPage", cardsPerPageValue);
    // setCurrentPage(page)
    currentUrl.searchParams.set("startPage", newPage);
    window.history.pushState({}, "", currentUrl.toString());

    setCurrentPage(Number(newPage));
  };

  const handleFilter = async (queryParams) => {
    // const queryString = new URLSearchParams(filters).toString();

    try {
      const res = await fetch(
        `/api/phones?${queryParams}&sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${currentPage}`
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

  // const handlePaginationArrowClick = async (e, currentPage, totalPages) => {
  //   // e.preventDefault()
  //   await totalPages;
  //   console.log(totalPages);
  //   let newPage;
  //   if (e.target.id === "prev") {
  //     newPage = currentPage - 1 === 0 ? currentPage : currentPage - 1;
  //   } else if (e.target.id === "next") {
  //     console.log(currentPage + 1 > totalPages);
  //     newPage = currentPage + 1 > totalPages ? currentPage : currentPage + 1;
  //   }

  //   console.log(newPage);
  //   console.log(currentPage !== newPage);

  //   if (currentPage !== newPage) {
  //     const currentUrl = new URL(window.location);
  //     currentUrl.searchParams.set("sort", sortValue);
  //     currentUrl.searchParams.set("perPage", cardsPerPageValue);
  //     setCurrentPage(newPage)
  //     currentUrl.searchParams.set("startPage", newPage);
  //     window.history.pushState({}, "", currentUrl.toString());
  //   }

  //   // console.log(newPage);
  //   // handlePageChange(newPage)
  //   // const currentUrl = new URL(window.location);
  //   // currentUrl.searchParams.set("sort", sortValue);
  //   // currentUrl.searchParams.set("perPage", cardsPerPageValue);
  //   // currentUrl.searchParams.set("startPage", newPage);
  //   // window.history.pushState({}, "", currentUrl.toString());

  //   // setCurrentPage(newPage);
  // };

  return (
    <article className={styles.container}>
      <h1 className={styles.phonesTitle}>Mobile phones</h1>
      <h3 className={styles.subtitle}>{totalNumber} models</h3>

      <div className={styles.selectsContainer}>
        {/* <ReactFilters
          isAdaptive={true}
          filters={filters}
          filterData={filterData}
          values={values}
          errors={errors}
          appliedFilters={appliedFilters}
          canReset={canReset}
          setValues={setValues}
          applyFilters={applyFilters}
          handleReset={handleReset}
          typeKey={typeKey}
          labelKey={labelKey}
          hintKey={hintKey}
          filtersBlockComponent={filtersBlockComponent}
          wrapperId={wrapperId}
          toggleButtonId={toggleButtonId}
          renderToggleButton={renderToggleButton}
          renderResetButton={renderResetButton}
          renderApplyButton={renderApplyButton}
        /> */}
        <Filter onFilterChange={handleFilter} />
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
          // breakLinkClassName={styles.paginationBreak}
          nextLabel={<RightArrowIcon />}
          nextLinkClassName={styles.nextPageLink}
          previousLabel={<LeftArrowIcon />}
          previousLinkClassName={styles.prevPageLink}
          // renderOnZeroPageCount={null}
          containerClassName={styles.pagination}
          // disabledClassName={styles.pageNumber}
          pageClassName={styles.paginationItem}
          activeClassName={styles.active}
          pageLinkClassName={styles.paginationItemLink}
        />
      )}
    </article>
  );
};

export default Phones;
