import { updateNote } from "../services/updateNote";

export const archiveNote = async (noteId, updatedData) => {
  try {
    return await updateNote(noteId, updatedData);
  } catch (error) {
    console.error(error);
  }
};
