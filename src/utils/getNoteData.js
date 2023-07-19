import { getSingleData } from "../services/getSingleData";

export const getNoteData = async (noteId, setUserNote) => {
  try {
    const noteData = await getSingleData("notes", noteId);
    if (noteData) {
      setUserNote(() => noteData);
    }
  } catch (error) {
    console.error(error);
  }
};
