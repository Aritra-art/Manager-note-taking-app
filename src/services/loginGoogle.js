import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export const logingoogle = async () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return await signInWithPopup(auth, googleAuthProvider);
};
