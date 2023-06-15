import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import ChartCircuits from "./components/chart";
import Drivers from "./components/drivers";
import SearchDrivers from "./components/searchdriver";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/main";
import Footer from "./components/footer";
import History from "./components/history";
import Blocked from "./components/blocked"; // Dodany import Blocked
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <div className="layout">
      <Navbar user={user}/>
      <main className="main">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {user ? (
          <Route path="/" element={<Main />} />
        ) : (
          <>
            <Route path="/" element={<Blocked />} /> 
            <Route path="/login" element={<Navigate replace to="/login" />} />
          </>
        )}
        {user && <Route path="/list" element={<RecordList />} />}
        <Route path="/list" element={<Navigate replace to="/" />} />
        {user && <Route path="/create" element={<Create />} />}
        <Route path="/create" element={<Navigate replace to="/" />} />
        {user && <Route path="/chart" element={<ChartCircuits />} />}
        <Route path="/chart" element={<Navigate replace to="/" />} />
        {user && <Route path="/drivers" element={<Drivers />} />}
        <Route path="/drivers" element={<Navigate replace to="/" />} />
        {user && <Route path="/search" element={<SearchDrivers />} />}
        <Route path="/search" element={<Navigate replace to="/" />} />
        {user && <Route path="/history" element={<History />} />}
        <Route path="/history" element={<Navigate replace to="/" />} />
        {user && <Route path="/edit/:id" element={<Edit />} />}
        <Route path="/edit/:id" element={<Navigate replace to="/" />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
