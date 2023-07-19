import { AddNote } from "./AddNote";
import "./EditModal.css";
export const EditModal = ({ editModal, setEditModal }) => {
  return (
    <>
      <div className={`modal ${editModal?.show ? "open" : ""}`}>
        <div className="modal-content">
          <button
            className="close-button"
            onClick={() =>
              setEditModal((editModal) => ({ ...editModal, show: false }))
            }
          >
            X
          </button>
          <div className="modal-inner-content">
            <AddNote noteId={editModal?.id} setEditModal={setEditModal} />
          </div>
        </div>
      </div>
    </>
  );
};
