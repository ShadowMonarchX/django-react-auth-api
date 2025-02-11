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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tc, setTc] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setServerError({
        password: "Password must be at least 6 characters long",
      });
      return;
    }

    const actualData = { email, password, tc };

    try {
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
          <h1 className="auth-form-title">Register</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            {serverError?.email && (
              <p className="error-text">{serverError.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            {serverError?.password && (
              <p className="error-text">{serverError.password}</p>
            )}

            <div className="aggrement-container">
              <div className="agrement-checkbox">
                <input
                  className="margin-bt0"
                  type="checkbox"
                  name="tc"
                  checked={tc}
                  onChange={(e) => setTc(e.target.checked)}
                  required
                />
              </div>
              <div>I agree to the terms and conditions</div>
            </div>

            <button type="submit" className="btn-signin">
              Continue
            </button>
          </form>

          {serverError?.general && (
            <div className="error-message">{serverError.general}</div>
          )}

          <br />

          <div className="social-login">
            <button className="btn-social google-btn">
              <img src={logo2} alt="Google" />
              Sign up with Google
            </button>
            <button className="btn-social netflix-btn">
              <img src={logo1} alt="Netflix" />
              Sign up with Netflix
            </button>
          </div>

          <div className="form-signup">
            <span>Already have an account? </span>
            <Link to="/login">Sign in now</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
