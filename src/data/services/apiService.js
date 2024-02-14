const basePathUrl = import.meta.env.VITE_BASE_API_URL;

export const addMeeting = async (meeting) => {
  try {
    const response = await axios.post(`${basePathUrl}/meetings`, meeting);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar reunião:", error);
    throw error;
  }
};

export const updateMeeting = async (meeting) => {
  try {
    const response = await axios.put(
      `${basePathUrl}/meetings/${meeting.id}`,
      meeting
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar reunião:", error);
    throw error;
  }
};

export const deleteMeeting = async (id) => {
  try {
    await axios.delete(`${basePathUrl}/meetings/${id}`);
  } catch (error) {
    console.error("Erro ao excluir reunião:", error);
    throw error;
  }
};

export const getMeetingById = async (id) => {
  try {
    const response = await axios.get(`${basePathUrl}/meetings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter reunião por ID:", error);
    throw error;
  }
};

export const getAllMeetings = async () => {
  try {
    const response = await axios.get(`${basePathUrl}/meetings`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter todas as reuniões:", error);
    throw error;
  }
};
