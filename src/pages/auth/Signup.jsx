import { useState } from "react";
import "./Signup.css";
import { signupService } from "../../services/signupService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateUserProfile } from "../../services/updateUserProfile";
import { addDataToDB } from "../../services/addDataToDB";

export const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    err: "",
  });
  const [btnState, setBtnState] = useState("Sign Up");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails((signupDetails) => ({ ...signupDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (signupDetails?.password === signupDetails?.confirmpassword) {
        setBtnState(() => "Signing Up . . . ");
        setSignupDetails((signupDetails) => ({
          ...signupDetails,
          err: "",
        }));
        const response = await signupService(signupDetails);
        const user = response?.user;
        await updateUserProfile({
          displayName: `${signupDetails?.firstname} ${signupDetails?.lastname}`,
          photoURL:
            "https://res.cloudinary.com/dazdakg1z/image/upload/v1687937262/wxwcgc6e8d0dvla3w3nl.avif",
        });
        await addDataToDB("users", {
          id: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          emailVerified: user?.emailVerified,
          photoURL: user?.photoURL,
        });

        navigate("/home");
        setBtnState(() => "Sign Up");
      } else {
        setSignupDetails((signupDetails) => ({
          ...signupDetails,
          err: "password should match confirm password",
        }));
      }
    } catch (error) {
      setSignupDetails((signupDetails) => ({
        ...signupDetails,
        err: error.message,
      }));
    }
  };
  return (
    <>
      <div className="container">
        <h2 className="signup-header">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstname"
              value={signupDetails?.firstname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastname"
              value={signupDetails?.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupDetails?.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={signupDetails?.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmpassword"
              value={signupDetails?.confirmpassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <small className="form-err">{signupDetails?.err}</small>
          <button type="submit">{btnState}</button>
          <div className="signup-link">
            <Link to="/login">Already have an Account ? Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};
