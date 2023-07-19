import { useState } from "react";
import { unpinNote } from "../utils/UnpinNote";
import { pinNote } from "../utils/pinNote";
import { trashNote } from "../utils/trashNote";
import { untrashNote } from "../utils/untrashNote";
import "./NoteCard.css";
import { DelModal } from "./DelModal";
import { archiveNote } from "../utils/archiveNote";
import { unarchiveNote } from "../utils/unarchiveNote";
import { toast } from "react-hot-toast";
import { getNoteDate } from "../utils/getNoteDate";
import { EditModal } from "./EditModal";

export const NoteCard = ({ note, fromTrash, fromArchive }) => {
  const [delModal, setDelModal] = useState({ show: false, id: "" });
  const [editModal, setEditModal] = useState({ show: false, id: "" });
  const {
    background,
    id,
    isPinned,
    isarchived,
    istrashed,
    label,
    notes,
    title,
    createdAt,
  } = note;

  return (
    <>
      {editModal?.show && (
        <EditModal editModal={editModal} setEditModal={setEditModal} />
      )}
      {delModal?.show && (
        <DelModal delModal={delModal} setDelModal={setDelModal} />
      )}
      <div
        className="note-card-layout"
        style={{
          background: background,
          color: background === "#ffffff" ? "#000000" : "#ffffff",
        }}
      >
        <div className="note-card-header">
          <h2>{title}</h2>
          <div
            className="note-card-pin"
            onClick={() => {
              isPinned
                ? toast.promise(unpinNote(id, { ...note, isPinned: false }), {
                    loading: "Unpinning . . . ",
                    success: <b>Unpinned</b>,
                    error: <b>Could not unpin</b>,
                  })
                : toast.promise(pinNote(id, { ...note, isPinned: true }), {
                    loading: "Pinning . . . ",
                    success: <b>Pinned</b>,
                    error: <b>Could not pin</b>,
                  });
            }}
          >
            {isPinned ? "Unpin" : "Pin"}
          </div>
        </div>
        <div className="note-card-notes">{notes}</div>
        <small className="note-card-date">
          {note?.updatedAt
            ? `Updated ${getNoteDate(note?.updatedAt)}`
            : `Created ${getNoteDate(createdAt)}`}
        </small>
        <div className="note-card-label">{label}</div>
        <div className="note-card-action-btns">
          <i
            title="Delete"
            className="fa-regular fa-trash-can"
            onClick={() => {
              if (fromTrash) {
                setDelModal((delModal) => ({
                  ...delModal,
                  show: true,
                  id: id,
                }));
              } else {
                !istrashed && trashNote(id, { ...note, istrashed: true });
              }
            }}
          ></i>
          {fromTrash && (
            <i
              title="Restore"
              className="fa-solid fa-trash-can-arrow-up"
              onClick={() => untrashNote(id, { ...note, istrashed: false })}
            ></i>
          )}
          {!fromTrash && !fromArchive && (
            <i
              title="Edit"
              className="fa-regular fa-pen-to-square"
              onClick={() => {
                setEditModal((editModal) => ({
                  ...editModal,
                  show: true,
                  id: id,
                }));
              }}
            ></i>
          )}
          {!fromTrash && fromArchive && (
            <i
              title="Unarchive"
              className="fa-solid fa-boxes-packing"
              onClick={() => {
                isarchived && unarchiveNote(id, { ...note, isarchived: false });
              }}
            ></i>
          )}
          {!fromTrash && !fromArchive && (
            <i
              title="Archive"
              className="fa-solid fa-box-archive"
              onClick={() => {
                !isarchived && archiveNote(id, { ...note, isarchived: true });
              }}
            ></i>
          )}
        </div>
      </div>
    </>
  );
};
