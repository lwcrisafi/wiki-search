import React, { useState } from "react";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import './App.css'

function App() {
  //step 2: create a state for searchQuery
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // step 3
  const [loading, setLoading] = useState(false);

  //step 2: implement fetchData to fetch data from api
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=${searchQuery}`
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
    fetchData();
  };

  return (
    <div>
      
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      {loading ? <p>Loading...</p> : <SearchResults results={searchResults} />}
    </div>
  );
}

export default App;
