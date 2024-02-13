import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import TextInput from "./TextInput";
import DateTimePicker from "./DateTimePicker";
import CollaboratorCheckbox from "./CollaboratorCheckbox";
import PhotoInput from "./PhotoInput";
import useMeetingForm from "../../data/hooks/useMeetingForm";
import { validateObjectiveInput } from "../../utils/validationUtils";

const MeetingForm = () => {
  const {
    objective,
    handleSetObjective,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    photoData,
    setPhotoData,
    collaborators,
    handleSubmit,
    selectedCollaborators,
    handleCollaboratorChange,
  } = useMeetingForm();

  return (
    <form onSubmit={handleSubmit} data-testid="meeting-form">
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Meeting Form
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <PhotoInput onPhotoChange={setPhotoData} initialPhoto={photoData} />
        </Grid>
        <Grid
          container
          item
          xs={6}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <DateTimePicker
            fullWidth
            label="Start Date and Time"
            name="startDatetime"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </Grid>
        <Grid
          container
          item
          xs={6}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <DateTimePicker
            fullWidth
            label="End Date and Time"
            name="endDatetime"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            label="Objective"
            name="objective"
            value={objective}
            onChange={(e) => handleSetObjective(e)}
            onInput={(e) => validateObjectiveInput(e)}
          />
        </Grid>
        <Grid item xs={12}>
          {collaborators &&
            collaborators.map((collaborator) => (
              <CollaboratorCheckbox
                key={collaborator}
                collaborator={collaborator}
                checked={selectedCollaborators.includes(collaborator)}
                onChange={() => handleCollaboratorChange(collaborator)}
              />
            ))}
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MeetingForm;
