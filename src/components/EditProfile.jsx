import { useEffect, useState } from "react";
import { getUserData } from "../utils/getUserData";
import { updateUserService } from "../services/updateUserService";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase";
import { getImageUrl } from "../services/getImageUrl";

export const EditProfile = ({ profileId, show, setShowEdit }) => {
  const [userDetails, setUserDetails] = useState({});
  const [preview, setPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((userDetails) => ({ ...userDetails, [name]: value }));
  };

  const updateProfile = async () => {
    try {
      await updateUserService(profileId, userDetails);
      setShowEdit((showEdit) => ({ ...showEdit, show: false }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    profileId && getUserData(profileId, setUserDetails);
  }, [profileId]);
  return (
    <>
      <div className={`modal ${show ? "open" : ""}`}>
        <div className="modal-content">
          <button
            className="close-button"
            onClick={() =>
              setShowEdit((showEdit) => ({ ...showEdit, show: false }))
            }
          >
            X
          </button>
          <div className="modal-inner-content">
            <div className="edit-preview-image">
              {preview ? (
                <img
                  className="user-photourl"
                  src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
                  style={{ border: "none" }}
                  alt="loading"
                />
              ) : (
                <img
                  src={userDetails?.photoURL}
                  alt="user-avatar"
                  className="user-photourl"
                  style={{ border: "none" }}
                />
              )}
            </div>

            <label>
              Full Name{" "}
              <input
                placeholder="Enter your full name"
                type="text"
                value={userDetails?.displayName ?? ""}
                onChange={handleInputChange}
                name="displayName"
              />
            </label>
            <label style={{ cursor: "pointer" }}>
              Change Profile Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => getImageUrl(e, setPreview, setUserDetails)}
                style={{ display: "none" }}
              />
            </label>
            <button
              type="submit"
              onClick={updateProfile}
              disabled={preview}
              style={{
                cursor: `${preview ? "not-allowed" : "pointer"}`,
                marginTop: "0.5rem",
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
