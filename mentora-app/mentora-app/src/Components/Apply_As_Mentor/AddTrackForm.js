import React, { useState } from "react";
import "./ApplyAsMentorForm.css";
import image from "./mentor.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const AddTrackForm = () => {
  const [formData, setFormData] = useState({
    track: "",
    experience: "",
    yearsOfExperience: null,
  });

  const [formErrors, setFormErrors] = useState({
    track: "",
    experience: "",
    yearsOfExperience: "",
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

  const handleYearsOfExperienceChange = (action) => {
    const currentYearsOfExperience = formData.yearsOfExperience;

    let newYearsOfExperience;
    if (action === "increase") {
      newYearsOfExperience =
        currentYearsOfExperience < 50
          ? currentYearsOfExperience + 1
          : currentYearsOfExperience;
    } else if (action === "decrease") {
      newYearsOfExperience =
        currentYearsOfExperience > 1
          ? currentYearsOfExperience - 1
          : currentYearsOfExperience;
    } else {
      newYearsOfExperience = currentYearsOfExperience;
    }

    setFormData({
      ...formData,
      yearsOfExperience: newYearsOfExperience,
    });
    setFormErrors({
      ...formErrors,
      yearsOfExperience: "",
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.track.trim()) {
      errors.track = "Track is required";
    }

    if (!formData.experience.trim()) {
      errors.experience = "Experience is required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  return (
    <div className="container">
      <div className="applyAsMentorContainer">
       
        <div className="leftSection">
          <h1 className="applyAsMentorText">Add <span>Track</span> </h1>
          <form className="applyAsMentorForm" onSubmit={handleFormSubmit}>
            <label>Track:</label>
            <input
              type="text"
              name="track"
              value={formData.track}
              onChange={handleInputChange}
              className="inputField"
            />
            {formErrors.track && (
              <div className="errorText">{formErrors.track}</div>
            )}

            <label>Experience:</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="inputField"
            />
            {formErrors.experience && (
              <div className="errorText">{formErrors.experience}</div>
            )}

            <label>Years of Experience:</label>
            <div className="inputField">
              <span className="counterValue">{formData.yearsOfExperience}</span>
              <button
                type="button"
                onClick={() => handleYearsOfExperienceChange("decrease")}
                className="counterButton"
              >
                <FontAwesomeIcon icon={faChevronDown} className="counterIcon" />
              </button>
              <button
                type="button"
                onClick={() => handleYearsOfExperienceChange("increase")}
                className="counterButton"
              >
                <FontAwesomeIcon icon={faChevronUp} className="counterIcon" />
              </button>
            </div>
            {formErrors.yearsOfExperience && (
              <div className="errorText">{formErrors.yearsOfExperience}</div>
            )}

            <button type="submit" className="nextButton">
              <span className="nextText">Add Another Track</span>{" "}
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button type="submit" className="nextButton">
              <span className="nextText">Apply</span>{" "}
            </button>
          </form>
              </div>
              <div className="rightSection">
          <img src={image} alt="Mentor" className="mentorImage" />
        </div>
      </div>
    </div>
  );
};

export default AddTrackForm;
