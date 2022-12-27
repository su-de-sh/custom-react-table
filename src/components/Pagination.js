import React from "react";

const Pagination = ({ pageNumber, setPageNumber, data }) => {
  return (
    <div id="pagination">
      <button
        id={pageNumber === 1 ? "disabled-button" : "primary-button"}
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
        {pageNumber} of {Math.ceil(data.length / 16)}
      </span>
      <button
        id={
          pageNumber === Math.ceil(data.length / 16)
            ? "disabled-button"
            : "primary-button"
        }
        onClick={() => {
          if (pageNumber < Math.ceil(data.length / 16)) {
            setPageNumber(pageNumber + 1);
          }
        }}
        disabled={pageNumber === Math.ceil(data.length / 16)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
