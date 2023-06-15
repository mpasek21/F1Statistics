import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

const user = localStorage.getItem("token");
const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
}

export default function Navbar() { 
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
       
          <NavLink className="navbar-brand" to="/">
            <img style={{ "width": "15%" }} src="/f1logo.png" alt={"f1 logo"}></img>
          </NavLink>
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="btn-toolbar flex-nowrap" role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2 pt-2 pb-2" role="group" aria-label="First group">
            {user ? (
              <>
                <button className={"btn btn-outline-primary text-nowrap"} onClick={() => navigate("/drivers")}>
                  2023 Season
                </button>
                <button className={"btn btn-outline-primary text-nowrap"} onClick={() => navigate("/history")}>
                  History
                </button>
                <button className={"btn btn-outline-primary text-nowrap"} onClick={() => navigate("/search")}>
                  Search Drivers
                </button>
                <button className={"btn btn-outline-primary text-nowrap"} onClick={() => navigate("/list")}>
                  List of circuits
                </button>
                <button className={"btn btn-outline-primary text-nowrap"} onClick={() => navigate("/chart")}>
                  Circuits Chart
                </button>
                <button className={"btn btn-outline-primary text-nowrap"} onClick={() => navigate("/create")}>
                  Create a circuit
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-primary text-nowrap">
                  Login
                </NavLink>
                <NavLink to="/signup" className="btn btn-outline-primary text-nowrap">
                  Signup
                </NavLink>
              </>
            )}
          </div>
          <div className="btn-group p-2" role="group" aria-label="Third group">
            {user ? (
              <button className={"btn btn-danger"} onClick={handleLogout}>
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
}