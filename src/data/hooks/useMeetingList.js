import { useContext } from "react";
import { MeetingContext } from "../contexts/MeetingContext";

const useMeetingList = () => {
  const { meetings, deleteMeeting } = useContext(MeetingContext);

  const formatDuration = (meeting) => {
    const start = new Date(meeting.startDateTime);
    const end = new Date(meeting.endDateTime);
    const duration = Math.abs(end - start);
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleDelete = (id) => {
    deleteMeeting(id);
  };

  return {
    meetings,
    formatDuration,
    handleDelete,
  };
};

export default useMeetingList;
