import { updateNote } from "../services/updateNote";

export const unpinNote = async (noteId, updatedData) => {
  try {
    await updateNote(noteId, updatedData);
  } catch (error) {
    console.error(error);
  }
};
