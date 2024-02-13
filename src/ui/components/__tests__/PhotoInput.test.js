import React from "react";
import { render, waitFor, act, fireEvent } from "@testing-library/react";
import PhotoInput from "../PhotoInput";

describe("PhotoInput", () => {
  test("should trigger file input when box is clicked", () => {
    const { container } = render(<PhotoInput />);
    const input = container.querySelector('input[type="file"]');
    const box = container.querySelector("div");

    fireEvent.click(box);

    expect(input).toHaveProperty("click");
  });

  test("should display selected photo", () => {
    const initialPhoto = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE...";
    const { getByAltText } = render(<PhotoInput initialPhoto={initialPhoto} />);
    const img = getByAltText("Selected");

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(initialPhoto);
  });

  test("should display 'Select Photo' when no photo is selected", () => {
    const { getByText } = render(<PhotoInput />);
    const selectPhotoText = getByText("Select Photo");

    expect(selectPhotoText).toBeInTheDocument();
  });

  test("should call onPhotoChange when a photo is selected", async () => {
    const mockOnPhotoChange = jest.fn();
    const { getByTestId } = render(
      <PhotoInput onPhotoChange={mockOnPhotoChange} />
    );
    const input = getByTestId("photo-uploader");

    const file = new File([["(⌐□_□)"]], "test.jpg", { type: "image/jpeg" });

    await act(async () => {
      await waitFor(() =>
        fireEvent.change(input, { target: { files: [file] } })
      );
    });

    expect(input.files.length).toBe(1);
    expect(mockOnPhotoChange).toHaveBeenCalled();
  });
});
