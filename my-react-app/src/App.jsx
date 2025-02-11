import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/defulat/Navbar";
import Home from "./components/defulat/Home";
import Footer from "./components/defulat/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import OtpUser from "./components/auth/OtpUser";
import AdditionalUser from"./components/auth/AdditionalUser"
import New from "./new";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/OtpUser" element={<OtpUser />} />
          <Route path="/AdditionalUser" element={<AdditionalUser/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
