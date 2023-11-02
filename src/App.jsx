import React, { useState, useEffect } from "react";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import './App.css'

function App() {
  //step 2: create a state for searchQuery
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // step 3
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0); //new state for offset
  // const resultsPerPage = 10; //number of results per page

  //step 2: implement fetchData to fetch data from api
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=${searchQuery}&sroffset=${offset}`
      );
      const data = await response.json();
      // console.log(data); // Log the API response for data structure
      setSearchResults(data.query.search);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  // step 2: create a function to handle the search
  const handleSearch = () => {
    setOffset(0); // reset offset to 0 when performing a new search
    fetchData();
  };

  //new useEffect to fetch data when the offset changes
  useEffect(() => {
    if (offset > 0) {
      fetchData();
    }
  }, [offset]);

  //increment offset by 10
  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };
  //decrease the offset by 10
  const handlePrev = () => {
    if (offset >= 10) { 
    setOffset((prevOffset) => prevOffset - 10);
    }
  };

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      {/* new button for previous results */}
      <button onClick={handlePrev}>Prev</button>
      {/* new button for next results */}
      <button onClick={handleNext}>Next</button>
      {loading ? <p>Loading...</p> : <SearchResults results={searchResults} />}
    </div>
  );
}

export default App;
