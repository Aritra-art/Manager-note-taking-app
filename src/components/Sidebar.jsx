import { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [route, setRoute] = useState("/note");

  const setRouteHandler = (e) => {
    setRoute(() => `/${e.target.textContent.toLowerCase()}`);
  };
  return (
    <>
      <div className="sidebar-layout">
        <Link
          className={`sidebar-pill ${route === "/note" && "active-pill"} `}
          to="/home"
          onClick={setRouteHandler}
        >
          Note
        </Link>
        <Link
          className={`sidebar-pill ${route === "/label" && "active-pill"} `}
          to="/label"
          onClick={setRouteHandler}
        >
          Label
        </Link>
        <Link
          className={`sidebar-pill ${route === "/archive" && "active-pill"} `}
          to="/archive"
          onClick={setRouteHandler}
        >
          Archive
        </Link>
        <Link
          className={`sidebar-pill ${route === "/trash" && "active-pill"} `}
          to="/trash"
          onClick={setRouteHandler}
        >
          Trash
        </Link>
      </div>
    </>
  );
};
