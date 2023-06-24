import React from "react";
import { render } from "@testing-library/react";
import { SearchResults } from "./SearchResults";

describe("SearchResults", () => {
  const tvShows = [
    { show: { id: 1, name: "Show 1" } },
    { show: { id: 2, name: "Show 2" } },
    { show: { id: 3, name: "Show 3" } },
  ];

  it("renders the SearchResults component", () => {
    const { container } = render(<SearchResults tvShows={tvShows} />);
    expect(container.querySelector("div")).toBeInTheDocument();
    expect(container.querySelector("h2")).toBeInTheDocument();
  });


  it("passes the correct props to SearchResult components", () => {
    const { container } = render(<SearchResults tvShows={tvShows} />);
    const searchResultComponents = container.querySelectorAll(".search-result");

    searchResultComponents.forEach((searchResult, index) => {
      const showProp = searchResult.getAttribute("data-show");
      const parsedShowProp = JSON.parse(showProp);
      expect(parsedShowProp).toEqual(tvShows[index].show);
    });
  });
});
