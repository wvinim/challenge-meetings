const objectiveConfig = {
  min: 1,
  max: 150,
};

const regexObjective = new RegExp(
  `^[a-zA-Z0-9áàâãéèẽêíìïĩîóòôõöúùûũçñÁÀÂÃÉÈẼÊÍÌÎĨÏÓÒÔÕÖÚÙÛŨÇÑ .,-\?\_\!\@]{${objectiveConfig.min},${objectiveConfig.max}}$`
);

const validateMeetingForm = (meeting) => {
  const meetingStart = new Date(meeting.startDateTime);
  const meetingEnd = new Date(meeting.endDateTime);

  let errors = [];

  if (!validateObjective(meeting.objective)) {
    errors.push(
      `Please enter an objective, between ${objectiveConfig.min} and ${objectiveConfig.max} characters.`
    );
  }
  if (!meeting.startDateTime) {
    errors.push("Please select a start date and time.");
  }

  if (!meeting.endDateTime) {
    errors.push("Please select an end date and time.");
  }

  if (meetingEnd <= meetingStart) {
    errors.push("End time must be after start time.");
  }

  if (meeting.collaborators.length === 0) {
    errors.push("Please select at least one collaborator.");
  }

  return errors;
};

const hasTimeConflict = (meetings, meetingData) => {
  const start = new Date(meetingData.startDateTime);
  const end = new Date(meetingData.endDateTime);
  const conflictedCollaborators = [];

  for (const meeting of meetings) {
    if (parseInt(meeting.id) === parseInt(meetingData?.id)) continue;

    const collides = meeting.collaborators.some((collaborator) =>
      meetingData.collaborators.includes(collaborator)
    );

    if (collides) {
      const meetingStart = new Date(meeting.startDateTime);
      const meetingEnd = new Date(meeting.endDateTime);

      if (
        (start >= meetingStart && start <= meetingEnd) ||
        (end >= meetingStart && end <= meetingEnd) ||
        (meetingStart >= start && meetingStart <= end) ||
        (meetingEnd >= start && meetingEnd <= end)
      ) {
        conflictedCollaborators.push(
          ...meeting.collaborators.filter((collaborator) =>
            meetingData.collaborators.includes(collaborator)
          )
        );
      }
    }
  }

  return conflictedCollaborators.length > 0 ? conflictedCollaborators : null;
};

const validateObjective = (string) => {
  return regexObjective.test(string);
};

const validateObjectiveInput = (e) => {
  var currentValue = e.target.value;
  if (!currentValue.match(regexObjective))
    e.target.value = currentValue.slice(0, -1);
};

const validateObjectiveChange = (e) => {
  var currentValue = e.target.value;
  if (!currentValue.match(regexObjective)) {
    e.target.value = "";
    return false;
  }
  return true;
};

export {
  validateObjective,
  validateObjectiveChange,
  validateObjectiveInput,
  validateMeetingForm,
  hasTimeConflict,
};
