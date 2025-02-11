import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../../services/UserAuthApi";
import "../../styles/NetflixClone.css";

function OtpUser() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [serverError, setServerError] = useState({});
  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtpMutation();
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(120); // 2-minute countdown

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          navigate("/register"); // Redirect to register after 2 min
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  const handleChange = (index, value) => {
    if (/\d/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (!/^\d{6}$/.test(enteredOtp)) {
      setServerError({ general: "OTP must be a 6-digit number" });
      return;
    }

    try {
      const res = await verifyOtp({ otp: enteredOtp });
      if (res.error) {
        setServerError(res.error.data.errors || { general: "Invalid OTP" });
      } else if (res.data) {
        navigate("/AdditionalUser");
      }
    } catch (error) {
      console.error("OTP Verification failed:", error);
      setServerError({ general: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="home">
      <div className="hero-section text-center text-white d-flex justify-content-center align-items-center">
        <div className="auth-container">
          <h1 className="auth-form-title">Enter OTP</h1>
          <p>Time remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div id="otp" className="inputs d-flex justify-content-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="m-2 text-center form-control rounded"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
            <button type="submit" className="btn-signin">Verify OTP</button>
          </form>

          {serverError.general && (
            <div className="error-message">{serverError.general}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtpUser;
