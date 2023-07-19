import { useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { DataContext } from "../context/DataContext";

export const Navbar = () => {
  const { user, loggedInUser } = useContext(AuthContext);
  const { dataState, dispatchData } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <span
            className="logo-header"
            onClick={() => {
              navigate("/home");
            }}
          >
            manager
          </span>
        </div>
        <div>
          <input
            type="text"
            className="search-input"
            placeholder="Search with Name and Label"
            value={dataState?.search}
            onChange={(e) => {
              dispatchData({
                type: "SET_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Notes
            </Link>
          </li>

          {!user && (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Hi {loggedInUser?.displayName?.split(" ")[0]} !
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};
