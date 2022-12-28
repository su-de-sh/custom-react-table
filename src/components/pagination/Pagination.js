import React from "react";
import "./Pagination.css";

const Pagination = ({ pageNumber, setPageNumber, data, noOfDataInAPage }) => {
  return (
    <div id="pagination">
      <button
        className={pageNumber === 1 ? "disabled-button" : "primary-button"}
        onClick={() => {
          if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
          }
        }}
        disabled={pageNumber === 1}
      >
        Prev
      </button>
      <span id="page-number">
        {pageNumber} of {Math.ceil(data.length / noOfDataInAPage)}
      </span>
      <button
        className={
          pageNumber === Math.ceil(data.length / noOfDataInAPage)
            ? "disabled-button"
            : "primary-button"
        }
        onClick={() => {
          if (pageNumber < Math.ceil(data.length / noOfDataInAPage)) {
            setPageNumber(pageNumber + 1);
          }
        }}
        disabled={pageNumber === Math.ceil(data.length / noOfDataInAPage)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
