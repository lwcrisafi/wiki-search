import React from "react";

function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div>
      {/* step 4: creat a searchBar component with input and button */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
