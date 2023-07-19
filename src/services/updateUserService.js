import { ref, update } from "firebase/database";
import { database } from "../firebase";

export const updateUserService = async (userId, updatedData) => {
  const updates = {};
  updates["users/" + `${userId}`] = updatedData;
  return await update(ref(database), updates);
};
