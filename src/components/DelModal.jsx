import { deleteNote } from "../utils/deleteNote";

export const DelModal = ({ delModal, setDelModal }) => {
  console.log(delModal);
  return (
    <>
      <div className="show-following-container-layout">
        <div className="modal-content">
          <div>
            <div className="modal-inner-content">
              <div className="del-modal-message">
                Do you want to permanently delete this Note ?
              </div>
              <div className="del-modal-action-btns">
                <button
                  type="submit"
                  onClick={() => {
                    deleteNote(delModal?.id);
                  }}
                >
                  Yes
                </button>{" "}
                <button
                  type="submit"
                  onClick={() =>
                    setDelModal((delModal) => ({ ...delModal, show: false }))
                  }
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
