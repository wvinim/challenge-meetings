import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ErrorModal from "../ErrorModal";

describe("ErrorModal component", () => {
  test("renders with correct message and closes when close button is clicked", () => {
    const onCloseMock = jest.fn();
    const errorMessage = "An error occurred.";

    const { getByText } = render(
      <ErrorModal open={true} onClose={onCloseMock} message={errorMessage} />
    );

    expect(getByText("Error")).toBeInTheDocument();
    expect(getByText(errorMessage)).toBeInTheDocument();

    fireEvent.click(getByText("Close"));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
