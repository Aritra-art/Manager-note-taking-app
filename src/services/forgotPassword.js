import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export const forgotPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};
