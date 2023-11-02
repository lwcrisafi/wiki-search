
import React from "react";
import './SearchResults.css'

function SearchResults({ results }) {
  return (
    <ul>
      {/* step 5: map through results and display article titles as links */}
      {results.map((result) => (
        <li key={result.pageid}>
          <a
            href={`https://en.wikipedia.org/wiki/${result.title}`}
            target="_blank" //open in new tab
          >
            {result.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;

