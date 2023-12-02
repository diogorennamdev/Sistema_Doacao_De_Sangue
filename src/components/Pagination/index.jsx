import PropTypes from 'prop-types';
import {IoIosArrowDropleft, IoIosArrowDropright  } from 'react-icons/io';

import './styles.css';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const maxPageNumbersToShow = 3;

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  return (
    <div className="pagination-container">
      <button className="pagination-prev" onClick={handlePrev} disabled={currentPage === 1}><IoIosArrowDropleft/></button>
      {startPage > 1 && <button className="pagination-number" onClick={() => handlePageClick(1)}>1</button>}
      {startPage > 2 && <span className="pagination-ellipsis">...</span>}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
        >
          {pageNumber}
        </button>
      ))}
      {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
      {endPage < totalPages && <button className="pagination-number" onClick={() => handlePageClick(totalPages)}>{totalPages}</button>}
      <button className="pagination-next" onClick={handleNext} disabled={currentPage === totalPages}><IoIosArrowDropright/></button>
    </div>
  );
}


Pagination.propTypes ={
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
