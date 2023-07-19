import { ref, update } from "firebase/database";
import { database } from "../firebase";

export const updateNote = async (noteId, updatedData) => {
  const updates = {};
  updates["/notes/" + `${noteId}`] = updatedData;
  return await update(ref(database), updates);
};
