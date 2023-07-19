import { ref, remove } from "firebase/database";
import { database } from "../firebase";

export const deleteNoteService = async (noteId) => {
  return await remove(ref(database, `/notes/` + `${noteId}`));
};
