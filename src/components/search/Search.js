import React from "react";
import "./Search.css";

const Search = ({ search, setSearch }) => {
  return (
    <div className="search-container">
      <input
        className="search-input search-icon"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
