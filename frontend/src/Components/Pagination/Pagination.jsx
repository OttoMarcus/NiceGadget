import React from "react";
import LeftArrow from "../Icons/LeftArrow";
import RightArrow from "../Icons/RightArrow";
import PropTypes from "prop-types";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  handlePaginationArrowClick,
}) => {
  const pages = [...Array(totalPages).keys()].map((n) => n + 1); // Создаёт массив номеров страниц

  return (
    <>
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button
            id="prev"
            className={styles.prevPage}
            onClick={(e) => handlePaginationArrowClick(e, currentPage)}
          >
            prev
          </button>
          {pages.map((page) => {
            const buttonClass =
              currentPage === page
                ? styles.pageNumberDisabled
                : styles.pageNumber;
            return (
              <button
                className={buttonClass}
                key={page}
                disabled={currentPage === page}
                onClick={(e) => handlePageChange(e, page)}
              >
                {page}
              </button>
            );
          })}
          <button
            id="next"
            className={styles.nextPage}
            onClick={(e) => handlePaginationArrowClick(e, currentPage)}
          >
            next
          </button>
        </div>
      )}
    </>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handlePaginationArrowClick: PropTypes.func.isRequired,
};

export default Pagination;

// const Pagination = ({ totalPages, currentPage, handlePageChange, handlePaginationArrowClick }) => {

//   const firstPage = Math.max(currentPage - 2, 1);
//   const lastPage = Math.min(currentPage + 2, totalPages);

//   const visiblePages = Array.from({ length: lastPage - firstPage + 1 }, (_, i) => i + firstPage);

//   return (
//     <>
//       {totalPages > 1 && (
//         <div className={styles.paginationContainer}>
//           <button id="prev" className={styles.prevPage} onClick={(e) => handlePaginationArrowClick(e, currentPage) }>prev</button>
//           {firstPage > 1 && (
//             <button className={styles.pageNumber} onClick={(e) => handlePageChange(e, firstPage - 1)}>{firstPage - 1}</button>
//           )}
//           {visiblePages.map(page => (
//             <button
//               key={page}
//               className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
//               onClick={(e) => handlePageChange(e, page)}
//             >
//               {page}
//             </button>
//           ))}
//           {lastPage < totalPages && (
//             <button className={styles.pageNumber} onClick={(e) => handlePageChange(e, lastPage + 1)}>{lastPage + 1}</button>
//           )}
//           <button id="next" className={styles.nextPage} onClick={(e) => handlePaginationArrowClick(e, currentPage)}>next</button>
//         </div>
//       )}
//     </>
//   );
// };

// Pagination.propTypes = {
//   currentPage: PropTypes.number.isRequired,
//   totalPages: PropTypes.number.isRequired,
//   handlePageChange: PropTypes.func.isRequired,
//   andlePaginationArrowClick: PropTypes.func.isRequired,
// };

// export default Pagination;
