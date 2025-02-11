import { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "../../assets/netflix-icon.png"; // Adjust based on actual structure
import logo2 from "../../assets/google-logo.png"; // Adjust based on actual structure
import { storeToken } from '../../services/LocalStorageService';
import "../../styles/NetflixClone.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="home">
      <div className="hero-section text-center text-white d-flex justify-content-center align-items-center">
        <div className="auth-container">
          <h1 className="auth-form-title">Sign In</h1>

          <form className="auth-form">
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn-signin">
              Sign In
            </button>

            <div className="social-login">
              <button className="btn-social google-btn">
                <img src={logo2} alt="Google" />
                Sign in with Google
              </button>
              <button className="btn-social netflix-btn">
                <img src={logo1} alt="Netflix" />
                Sign in with Netflix
              </button>
            </div>

            <div className="form-help">
        
              <div className="aggrement-container">
              <div className="agrement-checkbox">
                <input className="margin-bt0" type="checkbox" name="tc" />{" "}
              </div>
              <div>Remember me</div>
            </div>
             
            </div>
            <Link to="/forgot-password">Need help?</Link>
          </form>

          <div className="form-signup">
            <span>New to YourFlix? </span>
            <Link to="/register">Sign up now</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
