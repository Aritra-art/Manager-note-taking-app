import { updateNote } from "../services/updateNote";

export const pinNote = async (noteId, updatedData) => {
  try {
    return await updateNote(noteId, updatedData);
  } catch (error) {
    console.error(error);
  }
};
