import React from "react";
import { render, screen } from "@testing-library/react";
import { HomeContent } from "./HomeContent";

jest.mock("axios");

describe("HomeContent", () => {
  test("renders HomeContent component correctly", () => {
    render(<HomeContent />);

    expect(
      screen.getByText("Medimap TVMaze Coding Exercise")
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
