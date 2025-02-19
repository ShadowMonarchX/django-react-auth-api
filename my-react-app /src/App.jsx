import React, { useState , useEffect  } from "react";
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
import NavbarAfterLogin from"./components/defulat/ NavbarAfterLogin";
import FooterAfterLogin from "./components/defulat/FooterAfterLogin";
// import MainNavbar from "./MainNavbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

      const token = localStorage.getItem("authToken");
      if (token) {
          setIsLoggedIn(true);
      }
  }, []);

  const handleLogin = (token) => {
      localStorage.setItem("authToken", token);
      setIsLoggedIn(true);
  };

  const handleLogout = () => {
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
  };
  return (
    <Router>
      {/* Conditional Navbar */}
      {isLoggedIn ? (
        < NavbarAfterLogin isLoggedIn={isLoggedIn}  handleLogout={handleLogout} />
      ) : (
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/OtpUser" element={<OtpUser />} />
        <Route path="/AdditionalUser" element={<AdditionalUser />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/password-reset-confirm/:uidb64/:token" element={<ResetPassword />} />

        {/* Protected Routes (Available after Login) */}
        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
          </>
        )}
      </Routes>

      {/* Conditional Footer */}
      {isLoggedIn ? <FooterAfterLogin /> : <Footer />}
    </Router>
  );
}

export default App;
