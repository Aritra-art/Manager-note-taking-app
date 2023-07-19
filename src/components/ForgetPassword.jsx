import { useState } from "react";
import { forgotPassword } from "../services/forgotPassword";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      alert("Password Reset link has been sent to your email");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="login-container">
        <form className="login-form">
          <h2 className="signup-header">Forgot Password</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={forgotPasswordHandler}>
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};
