import React from "react";
import "./Pagination.css";

const Pagination = ({ pageNumber, setPageNumber, data, noOfDataToDisplay }) => {
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
      <span>
        {pageNumber} of {Math.ceil(data.length / noOfDataToDisplay)}
      </span>
      <button
        className={
          pageNumber === Math.ceil(data.length / noOfDataToDisplay)
            ? "disabled-button"
            : "primary-button"
        }
        onClick={() => {
          if (pageNumber < Math.ceil(data.length / noOfDataToDisplay)) {
            setPageNumber(pageNumber + 1);
          }
        }}
        disabled={pageNumber === Math.ceil(data.length / noOfDataToDisplay)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
