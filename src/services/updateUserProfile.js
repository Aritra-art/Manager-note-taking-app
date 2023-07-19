import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export const updateUserProfile = async (updatedData) => {
  await updateProfile(auth.currentUser, updatedData);
};
