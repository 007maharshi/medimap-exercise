import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const search = async (searchQuery) => {
    try {
      if (!searchQuery) {
        alert("Please enter a query before pressing search");
        return;
      }
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error while searching shows:", error);
    }
  };

  const contextValue = {
    searchResults,
    search,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
