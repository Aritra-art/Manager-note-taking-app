import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const loginService = async (loginDetails) => {
  return await signInWithEmailAndPassword(
    auth,
    loginDetails?.email,
    loginDetails?.password
  );
};
