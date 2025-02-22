import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./IncreaseOrDecreaseProductQuantity.module.scss";
import AdminPagination from "../../AdminPagination/AdminPagination";
import AdminSearch from "../../AdminSearch/AdminSearch";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import AdminCard from "../../AdminCards/AdminCard";
import ItemsPerPage from "../../ItemsPerPage/ItemsPerPage";

const IncreaseOrDecreaseProductQuantity = ({ category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalCount, setTotalCount] = useState(0);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce({ value: search });

  const [productsArr, setProductsArr] = useState(null);

  const handlePageSizeChange = (value) => setPageSize(value);

  useEffect(() => {
    axios
      .get(`/api/${category}/total`)
      .then((response) => {
        setTotalCount(response.data.total);
      })
      .catch((error) => {
        console.error(
          `There was a problem with fetching ${category} total:`,
          error
        );
      });
  }, [category]);

  useEffect(() => {
    axios
      .get(
        `/api/${category}/admin?perPage=${pageSize}&startPage=${currentPage}&q=${debouncedSearch}`
      )
      .then((response) => {
        setProductsArr(response.data.data);
      })
      .catch((error) => {
        console.error(
          `There was a problem with fetching ${category} products:`,
          error
        );
      });
  }, [pageSize, category, currentPage, debouncedSearch]);

  return (
    totalCount > 0 && (
      <div className={styles.contentWrapper}>
        <div className={styles.searchPerPageWrapper}>
          <AdminSearch onChange={setSearch} />
          <ItemsPerPage onChange={handlePageSizeChange} value={pageSize} />
        </div>
        <div className={styles.productsWrapper}>
          {Array.isArray(productsArr) &&
            productsArr.map((product) => {
              return (
                <AdminCard
                  key={product?.id}
                  quantity={product?.quantity}
                  color={product?.color}
                  price={product?.price}
                  name={product?.name}
                  operationType={"quantityChange"}
                  id={product?.id}
                  category={category}
                  picture={product?.picture}
                  discount={product?.discount ?? 0}
                />
              );
            })}
        </div>
        <AdminPagination
          onPageChange={(page) => setCurrentPage(page)}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={totalCount}
        />
      </div>
    )
  );
};

IncreaseOrDecreaseProductQuantity.propTypes = {
  category: PropTypes.string.isRequired,
};

export default React.memo(IncreaseOrDecreaseProductQuantity);
