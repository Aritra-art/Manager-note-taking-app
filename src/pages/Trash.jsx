import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { NoteCard } from "../components/NoteCard";

export const Trash = () => {
  const { dataState } = useContext(DataContext);
  return (
    <>
      <div className="user-notes-layout">
        {dataState?.trash?.length === 0 && <h2>No Notes in Trash</h2>}
        {dataState?.trash?.length > 0 &&
          dataState?.trash?.map((note) => {
            return (
              <div key={note?.id}>
                <NoteCard note={note} fromTrash />
              </div>
            );
          })}
      </div>
    </>
  );
};
