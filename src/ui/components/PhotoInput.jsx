import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const PhotoInput = ({ onPhotoChange, initialPhoto }) => {
  const [photoData, setPhotoData] = useState("");

  useEffect(() => {
    setPhotoData(initialPhoto);
  }, [initialPhoto]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoData(reader.result);
        onPhotoChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{ position: "relative", width: 180, height: 180, overflow: "hidden" }}
    >
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        data-testid="photo-uploader"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "pointer",
        }}
      />
      {photoData && (
        <img
          src={photoData}
          alt="Selected"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
      )}
      {!photoData && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="body1" color="textSecondary">
            Select Photo
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PhotoInput;
