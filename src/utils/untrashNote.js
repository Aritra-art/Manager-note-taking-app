import { updateNote } from "../services/updateNote";

export const untrashNote = async (noteId, updatedData) => {
  try {
    return await updateNote(noteId, updatedData);
  } catch (error) {
    console.error(error);
  }
};
