import React from "react";
import { TextField } from "@mui/material";

function DateTimePicker({ label, name, value, onChange }) {
  return (
    <TextField
      label={label}
      name={name}
      type="datetime-local"
      value={value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default DateTimePicker;
