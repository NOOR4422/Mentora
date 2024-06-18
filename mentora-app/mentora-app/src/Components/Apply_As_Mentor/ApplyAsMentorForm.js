import React, { useContext, useState } from "react";
import "./ApplyAsMentorForm.css";
import image from "./mentor.png";
import linkedinIcon from "./linkedin-icon.png";
import githubIcon from "./github-icon.png";
import cvIcon from "./cv-icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../Context/userContext";

const ApplyAsMentorForm = () => {
  const { auth } = useContext(User);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    applyAs: "Mentor",
    bio: "",
    linkedinUrl: "",
    githubUrl: "",
    cvFile: null,
    whyMentor: "",
  });

  const [formErrors, setFormErrors] = useState({
    bio: "",
    linkedinUrl: "",
    githubUrl: "",
    cvFile: "",
    whyMentor: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      cvFile: file,
    });
    setFormErrors({
      ...formErrors,
      cvFile: "",
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.bio.trim()) {
      errors.bio = "Your Bio is required";
    }

    if (!formData.linkedinUrl.trim()) {
      errors.linkedinUrl = "Linkedin URL is required";
    }

    if (!formData.githubUrl.trim()) {
      errors.githubUrl = "Github URL is required";
    }

    if (!formData.cvFile) {
      errors.cvFile = "CV File is required";
    }

    if (!formData.whyMentor.trim()) {
      errors.whyMentor = "Reason for becoming a mentor is required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      // console.log(auth);
      try {
        const response = await axios.post(process.env.REACT_APP_URL + "Application",
          formData, {
            headers: {
              Authorization: "Bearer " + auth.Token,
              "Content-Type" :"application/json"
            }
          }
        )
        console.log(response);
        navigate("/addTrack");
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  return (
    <div className="container">
      <div className="applyAsMentorContainer">
        <div className="rightSection">
          <label htmlFor="fileInput">
            <img src={image} alt="Mentor" className="mentorImage" />
          </label>
          <input
            type="file"
            accept=".pdf"
            name="cvFile"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="leftSection">
          <h1 className="applyAsMentorText">
            Apply as <span className="greenText">Mentor</span>
          </h1>
          <form className="applyAsMentorForm" onSubmit={handleFormSubmit}>
            <label>Your Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="inputField"
            />
            {formErrors.bio && (
              <div className="errorText">{formErrors.bio}</div>
            )}

            <label>Linkedin URL:</label>
            <div className="inputWithIconContainer">
              <input
                type="text"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                className="inputField"
              />
              <img src={linkedinIcon} alt="Linkedin Icon" className="icon" />
            </div>
            {formErrors.linkedinUrl && (
              <div className="errorText">{formErrors.linkedinUrl}</div>
            )}

            <label>Github URL:</label>
            <div className="inputWithIconContainer">
              <input
                type="text"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                className="inputField"
              />
              <img src={githubIcon} alt="Github Icon" className="icon" />
            </div>
            {formErrors.githubUrl && (
              <div className="errorText">{formErrors.githubUrl}</div>
            )}

            <label>Upload Your CV:</label>
            <div className="inputWithIconContainer">
              <input
                type="file"
                accept=".pdf"
                name="cvFile"
                id="fileInput"
                onChange={handleFileChange}
                className="inputField"
              />
              <img src={cvIcon} alt="CV Icon" className="icon" />
            </div>
            {formErrors.cvFile && (
              <div className="errorText">{formErrors.cvFile}</div>
            )}

            <label>Why do you want to become a mentor?</label>
            <textarea
              name="whyMentor"
              value={formData.whyMentor}
              onChange={handleInputChange}
              className="inputField"
            />
            {formErrors.whyMentor && (
              <div className="errorText">{formErrors.whyMentor}</div>
            )}

            <button type="submit" className="nextButton">
              <span className="nextText">Next</span>
              <span className="arrowIcon">&rarr;</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyAsMentorForm;
