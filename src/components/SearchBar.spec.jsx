import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  test("should call onSearch when search button is clicked", () => {
    const onSearchMock = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <SearchBar onSearch={onSearchMock} />
    );

    const queryInput = getByPlaceholderText("TV Show Query");
    fireEvent.change(queryInput, { target: { value: "Game of Thrones" } });

    const searchButton = getByText("Search");
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledWith("Game of Thrones");
  });

  test("should call onSearch when Enter key is pressed", () => {
    const onSearchMock = jest.fn();

    const { getByPlaceholderText } = render(
      <SearchBar onSearch={onSearchMock} />
    );

    const queryInput = getByPlaceholderText("TV Show Query");
    fireEvent.change(queryInput, { target: { value: "Stranger Things" } });

    fireEvent.keyPress(queryInput, { key: "Enter", code: 13, charCode: 13 });

    expect(onSearchMock).toHaveBeenCalledWith("Stranger Things");
  });
});
