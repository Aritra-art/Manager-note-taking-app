import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/auth/AuthContext";
import { addDataToDB } from "../services/addDataToDB";
import { getNoteData } from "../utils/getNoteData";
import { updateNote } from "../services/updateNote";

export const AddNote = ({ noteId, setEditModal }) => {
  const { user } = useContext(AuthContext);

  const [showNote, setShowNote] = useState(false);
  const [err, setErr] = useState("");

  const [userNote, setUserNote] = useState({
    id: uuidv4(),
    title: "",
    notes: "",
    label: "",
    background: "#000000",
    isarchived: false,
    istrashed: false,
    isPinned: false,
    user: user?.uid,
  });
  useEffect(() => {
    noteId && getNoteData(noteId, setUserNote);
  }, [noteId]);

  const addNoteHandler = async () => {
    try {
      if (userNote?.title.length > 0) {
        if (userNote?.notes.length > 0) {
          if (userNote?.label.length > 0) {
            noteId
              ? await updateNote(noteId, {
                  ...userNote,
                  updatedAt: new Date().toString(),
                })
              : await addDataToDB("notes", {
                  ...userNote,
                  createdAt: new Date().toString(),
                });
            noteId &&
              setEditModal((editModal) => ({ ...editModal, show: false }));
            setUserNote((userNote) => ({
              ...userNote,
              id: uuidv4(),
              title: "",
              notes: "",
              label: "",
              background: "#000000",
            }));
          } else {
            setErr(() => "please add a label");
          }
        } else {
          setErr(() => "please add note description");
        }
      } else {
        setErr(() => "please add note title");
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="add-note-section-layout">
        <div className="add-note-section">
          {showNote && (
            <input
              className="add-note-input-title"
              type="text"
              placeholder="Enter Title"
              value={userNote?.title}
              onChange={(e) => {
                setUserNote((userNote) => ({
                  ...userNote,
                  title: e.target.value,
                }));
              }}
            />
          )}

          <textarea
            type="text"
            style={{
              border: `${showNote ? "1px solid #ccc" : "none"}`,
            }}
            value={userNote?.notes}
            onChange={(e) => {
              setUserNote((userNote) => ({
                ...userNote,
                notes: e.target.value,
              }));
            }}
            placeholder="Enter Notes"
            onClick={() => {
              setShowNote(() => true);
            }}
            onDoubleClick={() => {
              setShowNote(() => false);
            }}
          />

          {showNote && (
            <div className="add-note-action-btns">
              <input
                type="color"
                value={userNote?.background}
                onChange={(e) => {
                  setUserNote((userNote) => ({
                    ...userNote,
                    background: e.target.value,
                  }));
                }}
              />
              <input
                type="text"
                placeholder="Add Label"
                value={userNote?.label}
                onChange={(e) => {
                  setUserNote((userNote) => ({
                    ...userNote,
                    label: e.target.value,
                  }));
                }}
              />

              {err.length > 0 && <span>{err}</span>}
              <button
                type="submit"
                className="add-note-add-btn"
                onClick={addNoteHandler}
              >
                {noteId ? "Update Note" : "Add Note"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
