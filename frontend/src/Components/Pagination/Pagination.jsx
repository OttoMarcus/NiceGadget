import React from "react";
import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";

import ReactPaginate from "react-paginate";

import PropTypes from "prop-types";
import styles from "./Pagination.module.scss";

// INITIAL======================================================================

// const Pagination = React.memo(({
//   currentPage,
//   totalPages,
//   handlePageChange,
//   handlePaginationArrowClick,
// }) => {
//   const pages = [...Array(totalPages).keys()].map((n) => n + 1); // Создаёт массив номеров страниц

//   return (
//     <>
//       {totalPages > 1 && (
//         <div className={styles.paginationContainer}>
//           <button
//             id="prev"
//             className={styles.prevPage}
//             onClick={(e) =>
//               handlePaginationArrowClick(e, currentPage, totalPages)
//             }
//           >
//             prev
//           </button>
//           {pages.map((page) => {
//             const buttonClass =
//               currentPage === page
//                 ? styles.pageNumberDisabled
//                 : styles.pageNumber;
//             return (
//               <button
//                 className={buttonClass}
//                 key={page}
//                 disabled={currentPage === page}
//                 onClick={(e) => handlePageChange(e, page)}
//               >
//                 {page}
//               </button>
//             );
//           })}
//           <button
//             id="next"
//             className={styles.nextPage}
//             onClick={(e) => handlePaginationArrowClick(e, currentPage)}
//           >
//             next
//           </button>
//         </div>
//       )}
//     </>
//   );
// })

// Pagination.propTypes = {
//   currentPage: PropTypes.number.isRequired,
//   totalPages: PropTypes.number.isRequired,
//   handlePageChange: PropTypes.func.isRequired,
//   handlePaginationArrowClick: PropTypes.func.isRequired,
// };

// export default Pagination;

// PAGINATION PAGES MOVING LOGIC (TRY) ===================================================================

// const Pagination = React.memo(({ totalPages, currentPage, handlePageChange, handlePaginationArrowClick }) => {

//   console.log(totalPages);

//   const firstPage = Math.max(currentPage - 1, 1);
//   const lastPage = Math.min(currentPage + 1, totalPages);

//   const visiblePages = Array.from({ length: 4 }, (_, i) => i + firstPage);
//   // lastPage - firstPage + 1
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
// })

// Pagination.propTypes = {
//   currentPage: PropTypes.number.isRequired,
//   totalPages: PropTypes.number.isRequired,
//   handlePageChange: PropTypes.func.isRequired,
//   handlePaginationArrowClick: PropTypes.func.isRequired,
// };

// export default Pagination;

// PAGINATION PAGES MOVING LOGIC (BASE) ===================================================================

// const Pagination = React.memo(({ totalPages, currentPage, handlePageChange, handlePaginationArrowClick }) => {

//   console.log(totalPages);

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
// })

// Pagination.propTypes = {
//   currentPage: PropTypes.number.isRequired,
//   totalPages: PropTypes.number.isRequired,
//   handlePageChange: PropTypes.func.isRequired,
//   handlePaginationArrowClick: PropTypes.func.isRequired,
// };

// export default Pagination;

// REACT PAGINATE========================================================================

// const Pagination = React.memo(({
//     currentPage,
//     totalPages,
//     handlePageChange,
//     handlePaginationArrowClick,
//   }) => {
//     const pages = [...Array(totalPages).keys()].map((n) => n + 1); // Создаёт массив номеров страниц

//     return (
//       <>
//         {totalPages > 1 && (
//           <ReactPaginate
//           breakLabel="..."
//           nextLabel="next >"
//           onPageChange={handlePageChange}
//           pageRangeDisplayed={4}
//           pageCount={totalPages}
//           previousLabel="< previous"
//           renderOnZeroPageCount={null}
//         />
//         )}
//       </>
//     );
//   })

//   Pagination.propTypes = {
//     currentPage: PropTypes.number.isRequired,
//     totalPages: PropTypes.number.isRequired,
//     handlePageChange: PropTypes.func.isRequired,
//     handlePaginationArrowClick: PropTypes.func.isRequired,
//   };

//   export default Pagination;
