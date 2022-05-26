import "./App.css";
import React from "react";
import { Email } from "./Components/Email";
import { Reset } from "./Components/Reset";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/forgot-password/get-email" />} exact />
        <Route path="/forgot-password/get-email" element={<Email />} exact />
        <Route path="/forgot-password/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
