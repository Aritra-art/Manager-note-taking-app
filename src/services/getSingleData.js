import { child, get, ref } from "firebase/database";
import { database } from "../firebase";

export const getSingleData = async (dbName, id) => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `${dbName}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};
