import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@mui/material";
import useMeetingList from "../../data/hooks/useMeetingList";

function MeetingList() {
  const { meetings, formatDuration, handleDelete } = useMeetingList();

  return (
    <div>
      <Container maxWidth="md">
        <Grid container p={1}>
          <Grid container item xs={12}>
            <Typography flexWrap={"wrap"} variant="h4">
              Scheduled Meetings
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Link to="/add">
              <Button variant="contained">Add Meeting</Button>
            </Link>
          </Grid>
        </Grid>
        <List>
          {meetings.map((meeting) => (
            <ListItem key={meeting.id}>
              <Grid
                container
                spacing={1}
                sx={{ backgroundColor: "#dce1ff", borderRadius: "4px" }}
              >
                <Grid container item xs={8}>
                  <Grid item xs={12}>
                    <Typography noWrap variant="h6">
                      {meeting.objective}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      Start: {new Date(meeting.startDateTime).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      End: {new Date(meeting.endDateTime).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>About: {formatDuration(meeting)}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography flexWrap={"wrap"}>
                      {meeting.collaborators.join(", ")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={4} sx={{ p: 2 }} spacing={2}>
                  <Grid
                    container
                    item
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {meeting.photo && (
                      <ListItemAvatar>
                        <Avatar
                          alt="Meeting Photo"
                          src={meeting.photo}
                          variant="rounded"
                          sx={{ width: 84, height: 84 }}
                        />
                      </ListItemAvatar>
                    )}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {new Date(meeting.startDateTime) > Date.now() && (
                      <Button
                        component={Link}
                        to={`/edit/${meeting.id}`}
                        variant="contained"
                      >
                        Edit
                      </Button>
                    )}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      onClick={() => handleDelete(meeting.id)}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default MeetingList;
