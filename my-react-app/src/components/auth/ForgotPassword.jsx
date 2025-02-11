import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/NetflixClone.css"
function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="home">
      <div className="hero-section text-center text-white d-flex justify-content-center align-items-center">
        <div className="auth-container">
          <h1 className="auth-form-title">Forgot Password</h1>
          <form className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Reset Password</button>
          </form>
          <div className="form-signup">
            <Link to="/login">Back to Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
