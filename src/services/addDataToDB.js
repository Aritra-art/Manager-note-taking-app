import { ref, set } from "firebase/database";
import { database } from "../firebase";

export const addDataToDB = async (dbName, data) => {
  return await set(ref(database, `${dbName}/` + `${data?.id}`), data);
};
