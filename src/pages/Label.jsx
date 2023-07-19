import { NoteCard } from "../components/NoteCard";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
export const Label = () => {
  const { dataState } = useContext(DataContext);
  const labels = [...dataState?.notes, ...dataState?.pinned]
    ?.reduce(
      (acc, curr) =>
        acc.includes(curr?.label.toLowerCase())
          ? acc
          : [...acc, curr?.label.toLowerCase()],
      []
    )
    .sort();
  return (
    <>
      {labels?.length > 0 &&
        labels.map((individualLabel, index) => {
          return (
            <div key={index}>
              <h2 className="home-section-header">{individualLabel}</h2>
              <div className="user-notes-layout">
                {[...dataState?.notes, ...dataState?.pinned]
                  ?.filter(
                    (note) =>
                      note?.label.toLowerCase() ===
                      individualLabel?.toLowerCase()
                  )
                  ?.map((note) => {
                    return (
                      <div key={note.id}>
                        <NoteCard note={note} />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </>
  );
};
