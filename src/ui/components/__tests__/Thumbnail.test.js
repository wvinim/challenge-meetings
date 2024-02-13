import React from "react";
import { render } from "@testing-library/react";
import Thumbnail from "../Thumbnail";

describe("Thumbnail Component", () => {
  test("renders thumbnail with correct image data", () => {
    const imageData = "https://example.com/image.jpg";
    const { getByAltText } = render(<Thumbnail imageData={imageData} />);
    const thumbnailImage = getByAltText("Thumbnail");
    expect(thumbnailImage).toBeInTheDocument();
    expect(thumbnailImage).toHaveAttribute("src", imageData);
  });

  test("renders thumbnail with default alt text if not provided", () => {
    const imageData = "https://example.com/image.jpg";
    const { getByAltText } = render(<Thumbnail imageData={imageData} />);
    const thumbnailImage = getByAltText("Thumbnail");
    expect(thumbnailImage).toBeInTheDocument();
  });

  test("renders thumbnail with default dimensions", () => {
    const imageData = "https://example.com/image.jpg";
    const { getByAltText } = render(<Thumbnail imageData={imageData} />);
    const thumbnailImage = getByAltText("Thumbnail");
    expect(thumbnailImage).toHaveStyle("maxWidth: 100px");
    expect(thumbnailImage).toHaveStyle("maxHeight: 100px");
  });
});
