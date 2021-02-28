import React from "react";
import PropTypes from "prop-types";

import "./index.css";

function SearchBar(props) {
  return (
    <div className="mt-5 mb-2 mr-2">
      <input
        data-test="search"
        id="searchbar"
        style={{ paddingLeft: "1em" }}
        placeholder="Find your favourite character"
        onChange={(e) => props.searchHandler(e.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  searchHandler: PropTypes.func.isRequired,
};

export default SearchBar;
