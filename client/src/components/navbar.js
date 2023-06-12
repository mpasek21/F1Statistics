import React from "react";
// We import NavLink to utilize the react router.
import {NavLink, useNavigate} from 'react-router-dom';
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
}

// Here, we display our Navbar
export default function Navbar() {
    const navigate = useNavigate();
    return (<div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {localStorage.getItem("token") ? <NavLink className="navbar-brand" to="/list">
                <img style={{"width": 15 + '%'}} src="/f1logo.png" alt={"f1 logo"}></img>
            </NavLink> : <img style={{"width": 15 + '%'}} src="/f1logo.png" alt={"f1 logo"}></img>}
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
                    {localStorage.getItem("token") ?
                        <button className={"btn btn-outline-primary text-nowrap"}
                                onClick={() => navigate("/create")}>
                            Create Record
                        </button> : <p></p>}
                    {localStorage.getItem("token") ?
                        <button className={"btn btn-outline-primary text-nowrap"}
                                onClick={() => navigate("/chart")}>
                            Chart
                        </button> : <p></p>}
                    {localStorage.getItem("token") ?
                        <button className={"btn btn-outline-primary text-nowrap"}
                                onClick={() => navigate("/search")}>
                            Search Drivers
                        </button> : <p></p>}
                    {localStorage.getItem("token") ?
                        <button className={"btn btn-outline-primary text-nowrap"}
                                onClick={() => navigate("/drivers")}>
                            Drivers 2023
                        </button> : <p></p>}
                </div>
                <div className="btn-group p-2" role="group" aria-label="Third group">
                    {localStorage.getItem("token") ?
                        <button className={"btn btn-danger"} onClick={handleLogout}>
                            Logout
                        </button> : <p></p>}
                </div>
            </div>
        </nav>
    </div>);
}