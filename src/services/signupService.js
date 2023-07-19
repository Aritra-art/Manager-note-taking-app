import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
export const signupService = async (signupData) => {
  return await createUserWithEmailAndPassword(
    auth,
    signupData?.email,
    signupData?.password
  );
};
