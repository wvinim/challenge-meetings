import React from "react";

function Thumbnail({ imageData }) {
  return (
    <img
      src={imageData}
      alt="Thumbnail"
      style={{ maxWidth: "100px", maxHeight: "100px" }}
    />
  );
}

export default Thumbnail;
