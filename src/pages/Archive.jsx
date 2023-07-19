import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { NoteCard } from "../components/NoteCard";

export const Archive = () => {
  const { dataState } = useContext(DataContext);
  return (
    <>
      <div className="user-notes-layout">
        {dataState?.archive?.length === 0 && <h2>No Notes in Archives </h2>}
        {dataState?.archive?.length > 0 &&
          dataState?.archive?.map((note) => {
            return (
              <div key={note?.id}>
                <NoteCard note={note} fromArchive />
              </div>
            );
          })}
      </div>
    </>
  );
};
