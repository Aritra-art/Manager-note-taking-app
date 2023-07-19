import { deleteNoteService } from "../services/deleteNoteService";

export const deleteNote = async (noteId) => {
  try {
    await deleteNoteService(noteId);
  } catch (error) {
    console.error(error);
  }
};
