import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MeetingContext } from "../contexts/MeetingContext";
import {
  hasTimeConflict,
  validateMeetingForm,
  validateObjectiveChange,
} from "../../utils/validationUtils";

const useMeetingForm = () => {
  const params = useParams();
  const id = parseInt(params.id);
  const {
    meetings,
    addMeeting,
    getMeetingById,
    updateMeeting,
    collaborators,
    setError,
  } = useContext(MeetingContext);
  const navigate = useNavigate();
  const [objective, setObjective] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [photoData, setPhotoData] = useState("");
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  useEffect(() => {
    (async function () {
      if (id) {
        const meeting = await getMeetingById(id);
        if (meeting) {
          setObjective(meeting.objective);
          setStartDateTime(meeting.startDateTime);
          setEndDateTime(meeting.endDateTime);
          setPhotoData(meeting.photo);
          setSelectedCollaborators(meeting.collaborators);
        }
      }
    })();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let meetingData = {
      objective,
      startDateTime,
      endDateTime,
      photo: photoData,
      collaborators: selectedCollaborators,
    };

    const errors = validateMeetingForm(meetingData);

    if (errors.length > 0) {
      setError(errors.join(" "));
      return;
    }

    meetingData = id ? { ...meetingData, id } : meetingData;

    const conflictedCollaborators = hasTimeConflict(meetings, meetingData);

    if (conflictedCollaborators) {
      setError(
        `Time conflict with another meeting for collaborator(s): ${conflictedCollaborators.join(
          ", "
        )}.`
      );
      return;
    }

    if (id) {
      updateMeeting(meetingData);
    } else {
      addMeeting(meetingData);
    }
    navigate("/");
  };

  const handleCollaboratorChange = (collaborator) => {
    if (selectedCollaborators.includes(collaborator)) {
      setSelectedCollaborators(
        selectedCollaborators.filter((c) => c !== collaborator)
      );
    } else {
      setSelectedCollaborators([...selectedCollaborators, collaborator]);
    }
  };

  const handleSetObjective = (e) => {
    if (!validateObjectiveChange(e)) {
      setObjective("");
    }
    setObjective(e.target.value);
  };

  return {
    objective,
    handleSetObjective,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    photoData,
    setPhotoData,
    collaborators,
    selectedCollaborators,
    handleSubmit,
    handleCollaboratorChange,
  };
};

export default useMeetingForm;
