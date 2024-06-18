import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./CreateNewPasswordPage.css";
import image from "../../assets/createnewpass.png";

const CreateNewPasswordPage = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const togglePasswordVisibility = (inputType) => {
    if (inputType === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else if (inputType === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!newPassword.trim()) {
      errors.newPassword = "New Password is required";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Creating new password");
      navigate("/loginpage");
    }
  };

  return (
    <div className="container">
      <div className="loginContainer">
        <div className="leftSection">
          <h2 className="createNewPasswordText">Create New Password</h2>
          <p className="subText">Create new password for your account.</p>
          <form className="createNewPasswordForm" onSubmit={handleFormSubmit}>
            <label>New Password:</label>
            <div className="passwordInputContainer">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={handleInputChange}
                className="inputField"
              />
              <div
                className="new-password-eye-icon"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
              </div>
            </div>
            {formErrors.newPassword && (
              <div className="errorText">{formErrors.newPassword}</div>
            )}

            <label>Confirm Your Password:</label>
            <div className="passwordInputContainer">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleInputChange}
                className="inputField"
              />
              <div
                className="confirm-password-eye-icon"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEye : faEyeSlash}
                />
              </div>
            </div>
            {formErrors.confirmPassword && (
              <div className="errorText">{formErrors.confirmPassword}</div>
            )}
            <button
              type="submit"
              className="buttonStyle"
              // onClick={handleFormSubmit}
            >
              Finish
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

export default CreateNewPasswordPage;
