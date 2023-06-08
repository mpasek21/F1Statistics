import React from "react";
import { Route, BrowserRouter as Router, Switch, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import ChartCircuits from "./components/chart";
import Drivers from "./components/drivers";
import SearchDrivers from "./components/searchdriver";
const App = () => {
    return (
        <div>
            <Navbar/>
            <Routes>               
                <Route exact path="/" element={<RecordList/>}/>
                <Route path="/create" element={<Create/>}/>
                <Route path="/chart" element={<ChartCircuits/>}/>
                <Route path="/drivers" element={<Drivers/>}/>
                <Route path="/search" element={<SearchDrivers/>}/>
                <Route path="/edit/:id" element={<Edit/>}/>
            </Routes>
        </div>
    );
};

export default App;