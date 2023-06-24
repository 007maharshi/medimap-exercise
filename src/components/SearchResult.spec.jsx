import React from "react";
import { render, screen } from "@testing-library/react";
import { SearchResult } from "./SearchResult";

describe("SearchResult", () => {
  const show = {
    id: 1,
    name: "Test Show",
    image: {
      medium: "test-image-medium.jpg",
      original: "test-image-original.jpg",
    },
  };

  it("renders show name and image correctly", () => {
    render(<SearchResult show={show} />);

    const showNameElement = screen.getByText("Test Show");
    expect(showNameElement).toBeInTheDocument();

    const showImageElement = screen.getByAltText("Test Show");
    expect(showImageElement).toBeInTheDocument();
    expect(showImageElement).toHaveAttribute("src", "test-image-medium.jpg");
  });

  it("renders link with correct href", () => {
    render(<SearchResult show={show} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/shows/1");
  });
});
