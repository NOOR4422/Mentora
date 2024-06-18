import React, { useState } from "react";
import "./ForgetPasswordPage.css";
import image from "../../assets/forgetPass.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
  });
  const [apiError, setApiError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
    setApiError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    }
    // else{ navigate("/verification", { state: { email } });}
        

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/user/resetPassword",
          { email }
        );
  
        console.log("Response from server:", response); // Check the response from the server
  
        if (response.statusText==="OK") {
          console.log("OTP sent successfully");
          navigate("/verification", { state: { email } });
        } else {
          setApiError( "Something went wrong");
        }
      } catch (error) {
        console.error("Error sending OTP:", error); // Check for any errors
        setApiError("This email is not valid");
      }
    }
  };

  return (
    <div className="container">
      <div className="loginContainer">
        <div className="leftSection">
          <h1 className="forgetPasswordPageText">Forget Password</h1>
          <form className="forgetPasswordForm" onSubmit={handleFormSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
              className="inputField"
            />
            {formErrors.email && (
              <div className="errorText">{formErrors.email}</div>
            )}
            {apiError && <div className="errorText">{apiError}</div>}

            <Link to="/RememberPass" className="rememberPass-link">
              <p className="RememberPass">Remember your password?</p>
            </Link>

            <button type="submit" className="buttonStyle">
              Reset your Password
            </button>
          </form>
        </div>
        <div className="rightSection">
          <img src={image} alt="Learning" className="learningImage" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
