import React, { useContext } from "react";
import { Container } from "@mui/material";

import ErrorModal from "../components/ErrorModal";
import { MeetingContext } from "../../data/contexts/MeetingContext";
import MeetingForm from "../components/MeetingForm";

const MeetingPage = () => {
  const { error, openErrorModal, handleCloseErrorModal } =
    useContext(MeetingContext);

  return (
    <Container maxWidth="sm">
      <ErrorModal
        open={openErrorModal}
        onClose={handleCloseErrorModal}
        message={error}
      />
      <MeetingForm></MeetingForm>
    </Container>
  );
};

export default MeetingPage;
