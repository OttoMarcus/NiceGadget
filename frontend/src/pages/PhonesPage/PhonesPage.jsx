import React, { useState, useEffect } from "react";
import Card from "../../Components/Cards/Card";
import Sort from "../../Components/Sort/Sort";
import Filter from "../../Components/Filter/FilterOptimized";
import LeftArrowIcon from "../../Components/Icons/LeftArrowIcon";
import RightArrowIcon from "../../Components/Icons/RightArrowIcon";
import PerPageSelect from "../../Components/PerPageSelect/PerPageSelect";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";
import styles from "./PhonesPage.module.scss";

const Phones = () => {
  const [phonesArr, setPhonesArr] = useState();

  const [filters, setFilters] = useState({
    discount: false,
    available: false,
    minPrice: 0,
    maxPrice: 0,
    modelName: [],
    capacity: [],
    color: [],
    ram: [],
    screen: [],
  });
  const [filterQueryString, setFilterQueryString] = useState(null);
  const [sortValue, setSortValue] = useState("-brandNew");
  const [cardsPerPageValue, setCardsPerPageValue] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumber, setTotalNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const typeModel = location.pathname.slice(1);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search); //take search params from URL

  //   const queryParams = Object.fromEntries(urlParams.entries()); // make an object from keys and values of search params

  //   const filterParams = Object.keys(filters).reduce((acc, key) => {
  //     // compare current 'filter' state and object from search params
  //     if (queryParams[key]) {
  //       const decodedValue = decodeURIComponent(queryParams[key]); //decode value of every search params to compare them
  //       if (Array.isArray(filters[key])) {
  //         //  in case 'filter' state key is array (any key/filter type with multiple selection)
  //         if (decodedValue.includes(",")) {
  //           // check if query params has more than 1 value
  //           acc[key] = decodedValue.split(","); // write the splitted (converted to array) value into appropriate filter state
  //         } else {
  //           acc[key] = [decodedValue]; // in case 'filter' state [key] is array but query param has only 1 value for it
  //         }
  //       } else if (decodedValue === "true" || decodedValue === "false") {
  //         // case for writing down the value into the 'filter' state as a Boolean, not as a String
  //         // console.log('boolean key is: ' ,key);
  //         acc[key] = JSON.parse(decodedValue);
  //       } else {
  //         acc[key] = Number(decodedValue); // case for any other key which value is not an array or boolean
  //       }
  //     }
  //     return acc;
  //   }, {});

  //   // console.log(filterParams);

  //   const sort = urlParams?.get("sort");
  //   // console.log("sort: ", sort);
  //   const perPage = urlParams?.get("perPage");
  //   // console.log("perPage: ", perPage);
  //   const startPage = urlParams?.get("startPage");
  //   // console.log("startPage: ", startPage);

  //   if (Object.keys(filterParams).length !== 0) {
  //     setFilters({ ...filters, ...filterParams });
  //     setFilterQueryString(new URLSearchParams(filterParams).toString());
  //   }
  //   setSortValue(sort ? sort : "-brandNew");
  //   setCardsPerPageValue(perPage ? Number(perPage) : 8);
  //   setCurrentPage(startPage ? Number(startPage) : 1);
  //   // eslint-disable-next-line
  // }, []);

  //Parse values FROM url query params TO states 'filters', 'perPageValue', 'currentPage' and 'filterQueryString', on page first load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location?.search); //take search params from URL
    if (urlParams.size !== 0) {
      console.log(urlParams);

      const queryParams = Object.fromEntries(urlParams.entries()); // make an object from keys and values of search params

      const filterParams = Object.keys(filters).reduce((acc, key) => {
        // compare current 'filter' state and object from search params
        if (queryParams[key]) {
          const decodedValue = decodeURIComponent(queryParams[key]); //decode value of every search params to compare them
          if (Array.isArray(filters[key])) {
            //  in case 'filter' state key is array (any key/filter type with multiple selection)
            if (decodedValue.includes(",")) {
              // check if query params has more than 1 value
              acc[key] = decodedValue.split(","); // write the splitted (converted to array) value into appropriate filter state
            } else {
              acc[key] = [decodedValue]; // in case 'filter' state [key] is array but query param has only 1 value for it
            }
          } else if (decodedValue === "true" || decodedValue === "false") {
            // case for writing down the value into the 'filter' state as a Boolean, not as a String
            acc[key] = JSON.parse(decodedValue);
          } else {
            acc[key] = Number(decodedValue); // case for any other key which value is not an array or boolean
          }
        }
        return acc;
      }, {});

      const sort = urlParams?.get("sort");
      const perPage = urlParams?.get("perPage");
      const startPage = urlParams?.get("startPage");

      if (Object.keys(filterParams).length !== 0) {
        setFilters({ ...filters, ...filterParams });
        setFilterQueryString(new URLSearchParams(filterParams).toString());
      }
      if (sort && sort !== sortValue) {
        console.log(sort);
        setSortValue(sort);
      }
      if (perPage && Number(perPage) !== cardsPerPageValue) {
        console.log(perPage);
        setCardsPerPageValue(Number(perPage));
      }
      if (startPage && Number(startPage) !== currentPage) {
        console.log(startPage);
        setCurrentPage(Number(startPage));
      }
    }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   const handlePopstate = () => {
  //     // Отправка запроса на сервер при нажатии кнопки "назад"
  //     fetch('ваш_условный_запрос')
  //       .then(response => {
  //         // Обработка ответа от сервера
  //         console.log('Запрос отправлен');
  //       })
  //       .catch(error => {
  //         // Обработка ошибки
  //         console.error('Ошибка при отправке запроса:', error);
  //       });
  //   };

  //   // Добавление слушателя события для кнопки "назад"
  //   window.addEventListener('popstate', handlePopstate);

  //   // Удаление слушателя события при размонтировании компонента
  //   return () => {
  //     window.removeEventListener('popstate', handlePopstate);
  //   };
  // }, []);

  // Base request
  const fetchData = async () =>
    // filterQueryString,
    // sortValue,
    // cardsPerPageValue,
    // currentPage
    {
      let fetchURL = filterQueryString
        ? `/api/phones?${filterQueryString}&sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${currentPage}`
        : `/api/phones?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${currentPage}`;
      try {
        const res = await fetch(fetchURL);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const { data, totalPages, total } = await res.json();
        setPhonesArr(data);
        setTotalNumber(Number(total));
        setTotalPages(Number(totalPages));
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

  // Sending requests on query params changing
  useEffect(() => {
    fetchData(filterQueryString, sortValue, cardsPerPageValue, currentPage);
  }, [filterQueryString, sortValue, cardsPerPageValue, currentPage]);

  const handleSortChange = async (newSortValue) => {
    setCurrentPage(1);
    setSortValue(newSortValue);

    const newPath = `${window.location.pathname}?${filterQueryString ? filterQueryString + "&" : ""}sort=${newSortValue}&perPage=${cardsPerPageValue}&startPage=1`;
    window.history.pushState({}, "", newPath);
  };

  const handlePerPageChange = async (newPerPageValue) => {
    setCurrentPage(1);
    setCardsPerPageValue(Number(newPerPageValue));

    const newPath = `${window.location.pathname}?${filterQueryString ? filterQueryString + "&" : ""}sort=${sortValue}&perPage=${newPerPageValue}&startPage=1`;
    window.history.pushState({}, "", newPath);
  };

  const handlePageChange = async ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(Number(newPage));

    const newPath = `${window.location.pathname}?${filterQueryString ? filterQueryString + "&" : ""}sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=${newPage}`;
    window.history.pushState({}, "", newPath);
  };

  const handleFilter = async () => {
    //define a variable to get filters with values, not to send to server empty values
    const nonEmptyFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (
          value !== false &&
          value !== "" &&
          (Array.isArray(value) ? value.length !== 0 : true)
        ) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    let queryString;
    if (Object.keys(nonEmptyFilters).length === 0) {
      queryString = null;
    } else {
      queryString = new URLSearchParams(nonEmptyFilters).toString();
    }

    setFilterQueryString(queryString);
    setCurrentPage(1);

    const newPath = `${window.location.pathname}?${queryString ? queryString + "&" : ""}sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=1`;
    window.history.pushState({}, "", newPath);
  };

  const clearFilters = async () => {
    const initialFiltersValues = {
      discount: false,
      available: false,
      minPrice: "",
      maxPrice: "",
      modelName: [],
      capacity: [],
      color: [],
      ram: [],
      screen: [],
    };

    setFilters(initialFiltersValues);
    setFilterQueryString(null);
    setCurrentPage(1);

    const newPath = `${window.location.pathname}?sort=${sortValue}&perPage=${cardsPerPageValue}&startPage=1`;
    window.history.pushState({}, "", newPath);
  };

  return (
    <article className={styles.container}>
      <h1 className={styles.phonesTitle}>Mobile phones</h1>
      <h3 className={styles.subtitle}>{totalNumber} models</h3>

      <div className={styles.selectsContainer}>
        <Filter
          handleFilter={handleFilter}
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
        />
        <Sort handleSortChange={handleSortChange} sortValue={sortValue} />
        <PerPageSelect
          handlePerPageChange={handlePerPageChange}
          cardsPerPageValue={Number(cardsPerPageValue)}
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
          forcePage={currentPage - 1}
        />
      )}
    </article>
  );
};

export default Phones;
