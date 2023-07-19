import { updateNote } from "../services/updateNote";

export const trashNote = async (noteId, updatedData) => {
  try {
    return await updateNote(noteId, updatedData);
  } catch (error) {
    console.error(error);
  }
};
