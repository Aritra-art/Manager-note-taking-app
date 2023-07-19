import { updateNote } from "../services/updateNote";

export const unarchiveNote = async (noteId, updatedData) => {
  try {
    return await updateNote(noteId, updatedData);
  } catch (error) {}
};
