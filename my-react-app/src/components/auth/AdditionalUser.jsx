import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/UserAuthApi";
import logo1 from "../../assets/netflix-icon.png";
import logo2 from "../../assets/google-logo.png";
import { storeToken } from "../../services/LocalStorageService";
import { Link } from "react-router-dom";
import "../../styles/NetflixClone.css";

function Register() {
  const navigate = useNavigate(); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [serverError, setServerError] = useState(null);
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const actualData = {  first_name: firstName, last_name: lastName, phone_number: phoneNumber, city };

    try {
      // Register the user
      const res = await registerUser(actualData);
      console.log(res);

      if (res.error) {
        if (res.error.data.error) {
          setServerError({ email: "This email is already registered." });
        } else {
          setServerError(res.error.data || { general: "Unknown error" });
        }
      } else if (res.data) {
        storeToken(res.data.token);
        navigate("/OtpUser");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setServerError({ general: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="home">
      <div className="hero-section text-center text-white d-flex justify-content-center align-items-center">
        <div className="auth-container">
          <h1 className="auth-form-title">User Info</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <button type="submit" className="btn-signin">
              Continue
            </button>
          </form>

          {serverError?.general && (
            <div className="error-message">{serverError.general}</div>
          )}

          <br />
        </div>
      </div>
    </div>
  );
}

export default Register;
