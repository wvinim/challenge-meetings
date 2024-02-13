import React from "react";
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";

const ErrorModal = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onClose={onClose} data-testid="errorModal">
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <p>{message}</p>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
