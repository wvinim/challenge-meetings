import React from "react";
import { TextField } from "@mui/material";

function TextInput({ label, name, value, onChange, onInput }) {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onInput={onInput}
    />
  );
}

export default TextInput;
