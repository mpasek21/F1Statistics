import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import ChartCircuits from "./components/chart";
import Drivers from "./components/drivers";
import SearchDrivers from "./components/searchdriver";
import Signup from "./components/Signup"
import Login from "./components/Login"

const App = () => {
    const user = localStorage.getItem("token")
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/signup" exact element={<Signup/>}/>
                <Route path="/login" exact element={<Login/>}/>
                {user && <Route path="/" element={<RecordList/>}/>}
                <Route path="/" element={<Navigate replace to="/login"/>}/>
                {user && <Route path="/list" element={<RecordList/>}/>}
                <Route path="/list" element={<Navigate replace to="/login"/>}/>
                {user && <Route path="/create" exact element={<Create/>}/>}
                <Route path="/create" element={<Navigate replace to="/login"/>}/>
                {user && <Route path="/chart" exact element={<ChartCircuits/>}/>}
                <Route path="/chart" element={<Navigate replace to="/login"/>}/>
                {user && <Route path="/drivers" exact element={<Drivers/>}/>}
                <Route path="/drivers" element={<Navigate replace to="/login"/>}/>
                {user && <Route path="/search" exact element={<SearchDrivers/>}/>}
                <Route path="/search" element={<Navigate replace to="/login"/>}/>
                {user && <Route path="/edit/:id" exact element={<Edit/>}/>}
                <Route path="/edit/:id" element={<Navigate replace to="/login"/>}/>
            </Routes>
        </div>
    );
};

export default App;