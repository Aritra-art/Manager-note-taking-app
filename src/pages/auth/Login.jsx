import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../services/loginService";
import { logingoogle } from "../../services/loginGoogle";
import { addDataToDB } from "../../services/addDataToDB";
export const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    err: "",
  });
  const [btnState, setBtnState] = useState("Login");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((loginDetails) => ({ ...loginDetails, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginDetails((loginDetails) => ({
      ...loginDetails,
      err: "",
    }));
    if (e.target.textContent === "Login") {
      setBtnState(() => "Logging In . . . ");
      try {
        await loginService(loginDetails);
        navigate("/home");
        setBtnState(() => "Login");
      } catch (error) {
        setLoginDetails((loginDetails) => ({
          ...loginDetails,
          err: error.message,
        }));
      }
    } else {
      try {
        const response = await logingoogle();
        const user = response?.user;
        await addDataToDB("users", {
          id: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          emailVerified: user?.emailVerified,
          photoURL: user?.photoURL,
        });
        navigate("/home");
      } catch (error) {
        setLoginDetails((loginDetails) => ({
          ...loginDetails,
          err: error.message,
        }));
      }
    }
  };
  return (
    <>
      <div className="login-container">
        <form className="login-form">
          <h2 className="signup-header">Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginDetails?.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginDetails?.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div
            className="forgot-password"
            onClick={() => {
              navigate("/forgotpassword");
            }}
          >
            Forgot Password ?
          </div>
          <small className="form-err">{loginDetails?.err}</small>
          <button type="submit" className="login-btn" onClick={handleSubmit}>
            {btnState}
          </button>
          <button type="submit" className="login-btn" onClick={handleSubmit}>
            Signin with Google
          </button>
          <div className="signup-link">
            <Link to="/signup">Create New Account</Link>
          </div>
        </form>
      </div>
    </>
  );
};
