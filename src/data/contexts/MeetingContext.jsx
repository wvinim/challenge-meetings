import React, { createContext, useState, useEffect } from "react";
import {
  addMeetingToIndexedDB,
  deleteMeetingFromIndexedDB,
  updateMeetingInIndexedDB,
  getAllMeetingsFromIndexedDB,
  getMeetingByIdFromIndexedDB,
} from "../services/indexedDBService";

export const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [collaborators] = useState([
    "Jack Sparrow",
    "John Wick",
    "Indiana Jones",
    "Bruce Wayne",
    "Han Solo",
    "Tyler Durden",
  ]);

  useEffect(() => {
    const loadMeetingsFromIndexedDB = async () => {
      try {
        const meetingsFromDB = await getAllMeetingsFromIndexedDB();
        setMeetings(meetingsFromDB);
      } catch (error) {
        console.error("Erro ao carregar reuniões do IndexedDB:", error);
      }
    };

    loadMeetingsFromIndexedDB();
  }, []);

  useEffect(() => {
    if (error) {
      setOpenErrorModal(true);
    }
  }, [error]);

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
    setTimeout(() => {
      setError(false);
    }, 300);
  };

  const addMeeting = async (meeting) => {
    try {
      const meetingId = await addMeetingToIndexedDB(meeting);
      setMeetings([...meetings, { ...meeting, id: meetingId }]);
    } catch (error) {
      setError("Erro ao adicionar reunião");
    }
  };

  const deleteMeeting = async (id) => {
    try {
      await deleteMeetingFromIndexedDB(id);
      setMeetings(meetings.filter((meeting) => meeting.id !== id));
    } catch (error) {
      setError("Erro ao excluir reunião");
    }
  };

  const updateMeeting = async (updatedMeeting) => {
    try {
      await updateMeetingInIndexedDB(updatedMeeting);
      setMeetings(
        meetings.map((meeting) =>
          meeting.id === updatedMeeting.id ? updatedMeeting : meeting
        )
      );
    } catch (error) {
      setError("Erro ao atualizar reunião");
    }
  };

  const getMeetingById = async (id) => {
    try {
      const meeting = await getMeetingByIdFromIndexedDB(id);
      return meeting;
    } catch (error) {
      setError("Erro ao obter reunião por ID");
    }
  };

  return (
    <MeetingContext.Provider
      value={{
        meetings,
        addMeeting,
        deleteMeeting,
        updateMeeting,
        getMeetingById,
        collaborators,
        error,
        setError,
        openErrorModal,
        handleCloseErrorModal,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};
