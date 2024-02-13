import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

function CollaboratorCheckbox({ collaborator, checked, onChange }) {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label={collaborator}
    />
  );
}

export default CollaboratorCheckbox;
