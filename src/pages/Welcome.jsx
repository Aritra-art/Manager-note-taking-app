import { useContext } from "react";
import "./Welcome.css";
import { AuthContext } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
export const Welcome = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="welcome">
      <header className="App-header">
        <div className="overlay"></div>
        <div className="content">
          <h1>Welcome to Manager</h1>
          <p>A powerful note-taking app to keep your ideas organized.</p>
          <button
            className="App-button"
            onClick={() => {
              navigate(user ? "/home" : "/login");
            }}
          >
            Get Started
          </button>
        </div>
      </header>
    </div>
  );
};
