import { useContext, useEffect, useState } from "react";
import { logout } from "../services/logout";
import { AuthContext } from "../context/auth/AuthContext";
import "./Profile.css";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import { Navbar } from "../components/Navbar";
import { EditProfile } from "../components/EditProfile";

export const Profile = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState({ show: false, id: "" });

  const verifyEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      alert("link sent");
    } catch (error) {
      alert(error.message);
    }
  };
  const logoutHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      {showEdit?.show && (
        <EditProfile
          profileId={showEdit?.id}
          show={showEdit?.show}
          setShowEdit={setShowEdit}
        />
      )}
      <Navbar />
      <div className="profile-container-layout">
        <div className="profile-container">
          <img
            src={loggedInUser?.photoURL}
            alt="user-avatar"
            className="user-photourl"
          />
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => {
                setShowEdit(() => ({ show: true, id: loggedInUser?.id }));
              }}
            >
              Edit profile
            </button>
          </div>
          <h2 className="profile-displayname">{loggedInUser?.displayName}</h2>
          <div>
            <span className="profile-email">{loggedInUser?.email}</span>
            {loggedInUser?.emailVerified ? (
              <i className="fa-solid fa-circle-check"></i>
            ) : (
              <span>
                <i className="fa-solid fa-circle-xmark"></i>
                <button className="profile-verifybtn" onClick={verifyEmail}>
                  verify now
                </button>
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="profile-logout"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </>
  );
};
