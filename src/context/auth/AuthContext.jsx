import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, database } from "../../firebase";
import { onValue, ref } from "firebase/database";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [loggedInUser, setLoggedInUser] = useState({});
  const getUserState = () => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
        setUser(() => currentUser);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  };

  const getLoggedinUser = async () => {
    try {
      const starCountRef = ref(database, "users/" + user?.uid);
      onValue(starCountRef, async (snapshot) => {
        setLoggedInUser(() => snapshot.val());
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    user && getLoggedinUser();
    getUserState();
  }, [user]);

  const value = { user, loggedInUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
