import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/defulat/Navbar";
import Home from "./components/defulat/Home";
import Footer from "./components/defulat/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/componentscss/App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import OtpUser from "./components/auth/OtpUser";
import AdditionalUser from "./components/auth/AdditionalUser";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Dashboard from "./components/defulat/Dashboard";
// import MainNavbar from "./MainNavbar";

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
          <Route path="/AdditionalUser" element={<AdditionalUser />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route
            path="/password-reset-confirm/:uidb64/:token"
            element={<ResetPassword />}
          />
          <Route path="/Dashboardr" element={<Dashboard />} />
          {/* <Route path="/MainNavbar" element={<MainNavbar/>}/> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
