import { createContext, useContext, useEffect, useReducer } from "react";
import { dataReducer } from "../reducer/dataReducer";
import { onValue, ref } from "firebase/database";
import { AuthContext } from "./auth/AuthContext";
import { database } from "../firebase";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [dataState, dispatchData] = useReducer(dataReducer, {
    notes: [],
    pinned: [],
    archive: [],
    trash: [],
    search: "",
    loading: false,
  });

  const getUserNotes = async () => {
    dispatchData({
      type: "SET_LOADER_TRUE",
      payload: true,
    });
    try {
      const starCountRef = ref(database, "notes/");
      onValue(starCountRef, (snapshot) => {
        dispatchData({
          type: "SET_USER_NOTES",
          payload: snapshot.val()
            ? Object.values(snapshot.val()).filter(
                (note) => note?.user === user?.uid
              )
            : [],
        });
        dispatchData({
          type: "SET_LOADER_FALSE",
          payload: false,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserNotes();
  }, [user]);

  // console.log(dataState?.trash);

  const value = { dataState, dispatchData };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
