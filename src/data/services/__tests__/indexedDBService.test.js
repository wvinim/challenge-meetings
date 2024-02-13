import {
  addMeetingToIndexedDB,
  deleteMeetingFromIndexedDB,
  updateMeetingInIndexedDB,
  getAllMeetingsFromIndexedDB,
  getMeetingByIdFromIndexedDB,
} from "../indexedDBService";

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

describe("IndexedDB Functions", () => {
  test("should add meetings to IndexedDB", async () => {
    const meeting = { id: 1, objective: "Meeting Objective" };
    const addedMeetingId = await addMeetingToIndexedDB(meeting);

    expect(addedMeetingId).toBe(1);

    const meeting2 = { id: 2, objective: "Meeting Objective" };
    const addedMeetingId2 = await addMeetingToIndexedDB(meeting2);

    expect(addedMeetingId2).toBe(2);
  });

  test("should get all meetings from IndexedDB", async () => {
    const meetings = await getAllMeetingsFromIndexedDB();

    expect(meetings).toEqual([
      { id: 1, objective: "Meeting Objective" },
      { id: 2, objective: "Meeting Objective" },
    ]);
  });

  test("should update meeting in IndexedDB", async () => {
    const updatedMeeting = { id: 1, objective: "Updated Meeting Objective" };
    await updateMeetingInIndexedDB(updatedMeeting);

    const meetings = await getAllMeetingsFromIndexedDB();
    expect(meetings).toEqual([
      { id: 1, objective: "Updated Meeting Objective" },
      { id: 2, objective: "Meeting Objective" },
    ]);
  });

  test("should get meeting by ID from IndexedDB", async () => {
    const meeting = await getMeetingByIdFromIndexedDB(1);
    expect(meeting).toEqual({ id: 1, objective: "Updated Meeting Objective" });
  });

  test("should delete meeting from IndexedDB", async () => {
    await deleteMeetingFromIndexedDB(1);

    const meetings = await getAllMeetingsFromIndexedDB();
    expect(meetings).toEqual([{ id: 2, objective: "Meeting Objective" }]);
  });
});
