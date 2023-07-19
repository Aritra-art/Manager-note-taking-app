import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { AddNote } from "../components/AddNote";
import { DataContext } from "../context/DataContext";
import { NoteCard } from "../components/NoteCard";
import "./Home.css";
import { filterNote } from "../utils/filterNote";
import { Oval } from "react-loader-spinner";

export const Home = () => {
  const { dataState } = useContext(DataContext);

  const filteredNotes = filterNote(
    dataState?.search?.trim()?.length > 0
      ? [...dataState?.notes, ...dataState?.pinned]
      : [...dataState?.notes],
    dataState
  );
  return (
    <>
      {dataState?.loading && (
        <Oval
          height={80}
          width={80}
          color="#333"
          wrapperStyle={{
            position: "fixed",
            top: "50%",
            left: "50%",
          }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#555"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      )}
      <AddNote />
      {dataState?.pinned?.length > 0 && (
        <h2 className="home-section-header">Pinned Notes</h2>
      )}
      <div className="user-notes-layout">
        {dataState?.pinned?.length > 0 &&
          dataState?.pinned?.map((note) => {
            return (
              <div key={note?.id}>
                <NoteCard note={note} />
              </div>
            );
          })}
      </div>
      {dataState?.pinned?.length > 0 && (
        <h2 className="home-section-header">
          {dataState?.search?.trim()?.length > 0 ? "Searched" : "Other"} Notes
        </h2>
      )}
      <div className="user-notes-layout">
        {filteredNotes.length > 0 &&
          filteredNotes?.map((note) => {
            return (
              <div key={note?.id}>
                <NoteCard note={note} />
              </div>
            );
          })}
      </div>
    </>
  );
};
