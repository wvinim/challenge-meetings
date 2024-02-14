const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("meetingsDB", 1);

    request.onerror = function (event) {
      console.error("Erro ao abrir o IndexedDB:", event.target.errorCode);
      reject(event.target.errorCode);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore("meetings", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("objective", "objective", { unique: false });
      objectStore.createIndex("startDateTime", "startDateTime", {
        unique: false,
      });
      objectStore.createIndex("endDateTime", "endDateTime", { unique: false });
      objectStore.createIndex("photo", "photo", { unique: false });
      objectStore.createIndex("collaborators", "collaborators", {
        unique: false,
      });
    };
  });
};

export const addMeetingToIndexedDB = async (meeting) => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction("meetings", "readwrite");
    const objectStore = transaction.objectStore("meetings");
    const addRequest = objectStore.add(meeting);

    return new Promise((resolve, reject) => {
      addRequest.onsuccess = function (event) {
        resolve(event.target.result);
      };

      addRequest.onerror = function (event) {
        console.error("Erro ao adicionar reunião:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Erro ao abrir o IndexedDB:", error);
    throw error;
  }
};

export const deleteMeetingFromIndexedDB = async (id) => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction("meetings", "readwrite");
    const objectStore = transaction.objectStore("meetings");
    const deleteRequest = objectStore.delete(id);

    return new Promise((resolve, reject) => {
      deleteRequest.onsuccess = function (event) {
        resolve();
      };

      deleteRequest.onerror = function (event) {
        console.error("Erro ao excluir reunião:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Erro ao abrir o IndexedDB:", error);
    throw error;
  }
};

export const updateMeetingInIndexedDB = async (updatedMeeting) => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction("meetings", "readwrite");
    const objectStore = transaction.objectStore("meetings");
    const updateRequest = objectStore.put(updatedMeeting);

    return new Promise((resolve, reject) => {
      updateRequest.onsuccess = function (event) {
        resolve();
      };

      updateRequest.onerror = function (event) {
        console.error("Erro ao atualizar reunião:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Erro ao abrir o IndexedDB:", error);
    throw error;
  }
};

export const getAllMeetingsFromIndexedDB = async () => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction("meetings", "readonly");
    const objectStore = transaction.objectStore("meetings");

    const index = objectStore.index("startDateTime");
    const request = index.getAll();

    // const request = objectStore.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = function (event) {
        resolve(event.target.result);
      };

      request.onerror = function (event) {
        console.error("Erro ao obter todas as reuniões:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Erro ao abrir o IndexedDB:", error);
    throw error;
  }
};

export const getMeetingByIdFromIndexedDB = async (id) => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction("meetings", "readonly");
    const objectStore = transaction.objectStore("meetings");
    const request = objectStore.get(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = function (event) {
        resolve(event.target.result);
      };

      request.onerror = function (event) {
        console.error("Erro ao obter reunião por ID:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Erro ao abrir o IndexedDB:", error);
    throw error;
  }
};
