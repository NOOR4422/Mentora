import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./RequestMentorPage.css";

const RequestMentorPage = () => {
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isTrackDropdownVisible, setIsTrackDropdownVisible] = useState(false);
  const [isLanguageDropdownVisible, setIsLanguageDropdownVisible] =
    useState(false);
  const [isGenderDropdownVisible, setIsGenderDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [mentorshipType, setMentorshipType] = useState("");
  const [isOneTimeSession, setIsOneTimeSession] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeFrom, setSelectedTimeFrom] = useState("");
  const [selectedTimeTo, setSelectedTimeTo] = useState("");
  const [mentorshipReasons, setMentorshipReasons] = useState({
    debug: false,
    codeReview: false,
    consultation: false,
  });
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [sessionType, setSessionType] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const trackSelectorRef = useRef(null);
  const languageSelectorRef = useRef(null);
  const genderSelectorRef = useRef(null);

  // State variables for error messages
  const [trackError, setTrackError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeFromError, setTimeFromError] = useState("");
  const [timeToError, setTimeToError] = useState("");
  const [sessionTypeError, setSessionTypeError] = useState("");
  const [mentorshipReasonError, setMentorshipReasonError] = useState("");
  const [minSalaryError, setMinSalaryError] = useState("");
  const [maxSalaryError, setMaxSalaryError] = useState("");

  useEffect(() => {
    const calculateDropdownPosition = (dropdownRef, dropdownVisible) => {
      if (!dropdownRef.current) return;
      const dropdownHeight = dropdownRef.current.clientHeight;
      const trackSelectorHeight = trackSelectorRef.current.clientHeight;
      const offset = dropdownVisible ? dropdownHeight : 0;
      dropdownRef.current.style.top = trackSelectorHeight + offset + "px";
    };

    calculateDropdownPosition(languageSelectorRef, isLanguageDropdownVisible);
    calculateDropdownPosition(genderSelectorRef, isGenderDropdownVisible);
  }, [isLanguageDropdownVisible, isGenderDropdownVisible]);

  const handleToggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "track":
        setIsTrackDropdownVisible(!isTrackDropdownVisible);
        setIsLanguageDropdownVisible(false);
        setIsGenderDropdownVisible(false);
        break;
      case "language":
        setIsLanguageDropdownVisible(!isLanguageDropdownVisible);
        setIsTrackDropdownVisible(false);
        setIsGenderDropdownVisible(false);
        break;
      case "gender":
        setIsGenderDropdownVisible(!isGenderDropdownVisible);
        setIsTrackDropdownVisible(false);
        setIsLanguageDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedTracks([...selectedTracks, option]);
    setIsTrackDropdownVisible(false);
    setSelectedOption("");
  };

  const handleOptionRemove = (optionToRemove) => {
    setSelectedTracks(
      selectedTracks.filter((option) => option !== optionToRemove)
    );
  };

  const renderSelectedTracks = () => {
    return selectedTracks.map((option, index) => (
      <div className="selected-track" key={index}>
        {option}
        <FontAwesomeIcon
          icon={faTimes}
          className="cancel-icon"
          onClick={() => handleOptionRemove(option)}
        />
      </div>
    ));
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownVisible(false);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setIsGenderDropdownVisible(false);
  };

  const handleMentorshipTypeSelect = (type) => {
    setMentorshipType(type);
    setIsOneTimeSession(false);
    setSelectedDate("");
    setSelectedTimeFrom("");
    setSelectedTimeTo("");
  };

  const handleOneTimeSessionToggle = () => {
    setIsOneTimeSession(!isOneTimeSession);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleTimeFromSelection = (time) => {
    setSelectedTimeFrom(time);
  };

  const handleTimeToSelection = (time) => {
    setSelectedTimeTo(time);
  };

  const handleMentorshipReasonChange = (reason) => {
    setMentorshipReasons({
      ...mentorshipReasons,
      [reason]: !mentorshipReasons[reason],
    });
  };

  const handleMinSalaryChange = (e) => {
    setMinSalary(e.target.value);
  };

  const handleMaxSalaryChange = (e) => {
    setMaxSalary(e.target.value);
  };

  const handleSessionTypeSelect = (type) => {
    setSessionType(type);
    setShowSessionDetails(true);
  };

  const handleSessionDurationSelect = (duration) => {
    setSessionDuration(duration);
  };

  const handleDateRangeSelect = (dateType, date) => {
    setSelectedDateRange((prevState) => ({
      ...prevState,
      [dateType]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate fields before submission
    let isValid = true;

    // Check if track is selected
    if (selectedTracks.length === 0) {
      setTrackError("Track is required");
      isValid = false;
    } else {
      setTrackError("");
    }

    // Check if language is selected
    if (!selectedLanguage) {
      setLanguageError("Preferred language is required");
      isValid = false;
    } else {
      setLanguageError("");
    }

    // Check if gender is selected
    if (!selectedGender) {
      setGenderError("Preferred gender is required");
      isValid = false;
    } else {
      setGenderError("");
    }

    // Check if mentorship type is selected
    if (!mentorshipType) {
      setSessionTypeError("Mentorship type is required");
      isValid = false;
    } else {
      setSessionTypeError("");
    }

    // Check if one-time session details are filled
    if (
      mentorshipType === "one-time" ||
      (mentorshipType === "long-term" && isOneTimeSession)
    ) {
      if (!selectedDate) {
        setDateError("Date is required");
        isValid = false;
      } else {
        setDateError("");
      }
      if (!selectedTimeFrom) {
        setTimeFromError("Time from is required");
        isValid = false;
      } else {
        setTimeFromError("");
      }
      if (!selectedTimeTo) {
        setTimeToError("Time to is required");
        isValid = false;
      } else {
        setTimeToError("");
      }
      let reasonsCount =
        Object.values(mentorshipReasons).filter(Boolean).length;
      if (reasonsCount === 0) {
        setMentorshipReasonError("At least one reason is required");
        isValid = false;
      } else {
        setMentorshipReasonError("");
      }
    }

    // Check if salary range is filled
    if (mentorshipType === "one-time" || isOneTimeSession) {
      if (!minSalary) {
        setMinSalaryError("Min salary is required");
        isValid = false;
      } else {
        setMinSalaryError("");
      }
      if (!maxSalary) {
        setMaxSalaryError("Max salary is required");
        isValid = false;
      } else {
        setMaxSalaryError("");
      }
    }

    if (isValid) {
      // Proceed with form submission
    }
  };

  return (
    <div className="all-RequestMentor-container">
      <div className="RequestMentor-Container">
        <div className="RequestMentor-page-container">
          <div className="RequestMentor-page">
            <div className="track-selector" ref={trackSelectorRef}>
              <div className="trackSelection-section">
                <h1>Request Mentor</h1>
                <h3 className="trackLabel">Track</h3>
                <div className="track-input rounded-field">
                  {renderSelectedTracks()}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    onClick={() => handleToggleDropdown("track")}
                    className="dropdown-icon"
                  />
                </div>
                {isTrackDropdownVisible && (
                  <div className="dropdown">
                    <ul>
                      <li onClick={() => handleOptionSelect("backend")}>
                        Backend
                      </li>
                      <li onClick={() => handleOptionSelect("frontend")}>
                        Frontend
                      </li>
                      <li onClick={() => handleOptionSelect("web")}>Web</li>
                    </ul>
                  </div>
                )}
                {trackError && <p className="error-message">{trackError}</p>}
              </div>
            </div>
            <div className="language-selector" ref={languageSelectorRef}>
              <div className="languageSelection-section">
                <h3 className="languageLabel">Preferred Language</h3>
                <div
                  className="language-input rounded-field"
                  onClick={() => handleToggleDropdown("language")}
                >
                  {selectedLanguage && (
                    <div className="selected-language">{selectedLanguage}</div>
                  )}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="dropdown-icon"
                  />
                </div>
                {isLanguageDropdownVisible && (
                  <div className="dropdown">
                    <ul>
                      <li onClick={() => handleLanguageSelect("Arabic")}>
                        Arabic
                      </li>
                      <li onClick={() => handleLanguageSelect("English")}>
                        English
                      </li>
                      <li onClick={() => handleLanguageSelect("French")}>
                        French
                      </li>
                    </ul>
                  </div>
                )}
                {languageError && (
                  <p className="error-message">{languageError}</p>
                )}
              </div>
            </div>
            <div className="gender-selector" ref={genderSelectorRef}>
              <form>
                <div className="genderSelection-section">
                  <h3 className="genderLabel">Preferred Gender</h3>
                  <div
                    className="gender-input rounded-field"
                    onClick={() => handleToggleDropdown("gender")}
                  >
                    {selectedGender && (
                      <div className="selected-gender">{selectedGender}</div>
                    )}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="dropdown-icon"
                    />
                  </div>
                  {isGenderDropdownVisible && (
                    <div className="dropdown">
                      <ul>
                        <li onClick={() => handleGenderSelect("Male")}>Male</li>
                        <li onClick={() => handleGenderSelect("Female")}>
                          Female
                        </li>
                      </ul>
                    </div>
                  )}
                  {genderError && (
                    <p className="error-message">{genderError}</p>
                  )}
                </div>
              </form>
            </div>
            <div className="mentorship-type-section">
              <h3>Mentorship Type</h3>
              <div className="mentorship-type-options">
                <label>
                  <input
                    type="radio"
                    value="one-time"
                    checked={mentorshipType === "one-time"}
                    onChange={() => handleMentorshipTypeSelect("one-time")}
                  />
                  One-time Session
                </label>
                <label>
                  <input
                    type="radio"
                    value="long-term"
                    checked={mentorshipType === "long-term"}
                    onChange={() => handleMentorshipTypeSelect("long-term")}
                  />
                  Long-term Session
                </label>
              </div>
              {sessionTypeError && (
                <p className="error-message">{sessionTypeError}</p>
              )}
            </div>
            {(mentorshipType === "one-time" || isOneTimeSession) && (
              <div className="session-options">
                <div className="one-time-session">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <h3>Date:</h3>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => handleDateSelection(e.target.value)}
                      />
                    </div>
                    {dateError && <p className="error-message">{dateError}</p>}
                    <div className="time-range">
                      <h3>Time:</h3>
                      <label>From:</label>
                      <input
                        type="time"
                        value={selectedTimeFrom}
                        onChange={(e) =>
                          handleTimeFromSelection(e.target.value)
                        }
                      />
                      {timeFromError && (
                        <p className="error-message">{timeFromError}</p>
                      )}
                      <label>To:</label>
                      <input
                        type="time"
                        value={selectedTimeTo}
                        onChange={(e) => handleTimeToSelection(e.target.value)}
                      />
                      {timeToError && (
                        <p className="error-message">{timeToError}</p>
                      )}
                    </div>
                    <div>
                      <h3>Why do you want a mentor for?</h3>
                      <label>
                        <input
                          type="checkbox"
                          checked={mentorshipReasons.debug}
                          onChange={() => handleMentorshipReasonChange("debug")}
                        />
                        Debug
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          checked={mentorshipReasons.codeReview}
                          onChange={() =>
                            handleMentorshipReasonChange("codeReview")
                          }
                        />
                        Code Review
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          checked={mentorshipReasons.consultation}
                          onChange={() =>
                            handleMentorshipReasonChange("consultation")
                          }
                        />
                        Consultation
                      </label>
                      {mentorshipReasonError && (
                        <p className="error-message">{mentorshipReasonError}</p>
                      )}
                    </div>
                    <div className="salaryRange">
                      <h3>Salary Range:</h3>
                      <span>
                        <label>Min Salary:</label>
                        <input
                          type="number"
                          value={minSalary}
                          onChange={handleMinSalaryChange}
                          min="0"
                          step="50"
                        />
                      </span>
                      {minSalaryError && (
                        <p className="error-message">{minSalaryError}</p>
                      )}
                      <span>
                        <label>Max Salary:</label>
                        <input
                          type="number"
                          value={maxSalary}
                          onChange={handleMaxSalaryChange}
                          min={parseInt(minSalary) + 50}
                          step="50"
                        />
                      </span>
                      {maxSalaryError && (
                        <p className="error-message">{maxSalaryError}</p>
                      )}
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              </div>
            )}
            {mentorshipType === "long-term" && (
              <div className="session-options">
                <div className="long-term-session">
                  <div className="session-type-options">
                    <h3>What do you prefer to be in?</h3>
                    <label>
                      <input
                        type="radio"
                        value="individual"
                        checked={sessionType === "individual"}
                        onChange={() => handleSessionTypeSelect("individual")}
                      />
                      Individual{" "}
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="group"
                        checked={sessionType === "group"}
                        onChange={() => handleSessionTypeSelect("group")}
                      />
                      Group
                    </label>
                  </div>
                  {showSessionDetails && (
                    <div>
                      {sessionType === "individual" && (
                        <div>
                          <div className="session-type-options">
                            <h3>Type the mentorship you prefer to be in?</h3>
                            <label>
                              <input
                                type="radio"
                                name="sessionType"
                                value="One-to-one"
                                // checked={sessionType === "One-to-one"}
                                // onChange={() =>
                                //   handleSessionTypeSelect("One-to-one")
                                // }
                              />
                              One-to-one
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="sessionType"
                                value="training-group"
                                // checked={sessionType === "traning-group"}
                                // onChange={() =>
                                //   handleSessionTypeSelect("traning-group")
                                // }
                              />
                              Group
                            </label>
                          </div>
                          <h3>Duration</h3>
                          <div className="duration-inputs">
                            <label>From:</label>
                            <input
                              type="date"
                              value={selectedDateRange.startDate}
                              onChange={(e) =>
                                handleDateRangeSelect(
                                  "startDate",
                                  e.target.value
                                )
                              }
                            />
                            {timeToError && (
                              <p className="error-message">{timeFromError}</p>
                            )}
                            <label>To:</label>
                            <input
                              type="date"
                              value={selectedDateRange.endDate}
                              onChange={(e) =>
                                handleDateRangeSelect("endDate", e.target.value)
                              }
                            />
                            {timeToError && (
                              <p className="error-message">{timeToError}</p>
                            )}
                          </div>
                          <div className="salaryRange">
                            <h3>Salary Range:</h3>
                            {minSalaryError && (
                              <p className="error-message">{minSalaryError}</p>
                            )}
                            <span>
                              <label>Min Salary:</label>
                              <input type="number" min="0" step="50" />
                            </span>
                            {minSalaryError && (
                              <p className="error-message">{minSalaryError}</p>
                            )}
                            <span>
                              <label>Max Salary:</label>
                              <input type="number" min="0" step="50" />
                            </span>
                          </div>
                          <button type="submit">Submit</button>
                        </div>
                      )}

                      {sessionType === "group" && (
                        <div>
                          {/* Group-specific details */}

                          <div className="trainee-range">
                            <h3>How Many Trainees Will be in the group?:</h3>
                            <span>
                              <input type="number" />
                            </span>
                          </div>
                          <h3>Duration</h3>
                          <div className="duration-inputs">
                            <label>From:</label>
                            <input
                              type="date"
                              value={selectedDateRange.startDate}
                              onChange={(e) =>
                                handleDateRangeSelect(
                                  "startDate",
                                  e.target.value
                                )
                              }
                            />
                            {timeFromError && (
                              <p className="error-message">{timeFromError}</p>
                            )}
                            <label>To:</label>
                            <input
                              type="date"
                              value={selectedDateRange.endDate}
                              onChange={(e) =>
                                handleDateRangeSelect("endDate", e.target.value)
                              }
                            />
                            {timeToError && (
                              <p className="error-message">{timeToError}</p>
                            )}
                          </div>
                          {/* <div className="salaryRange">
                            <h3>Salary Range for the group:</h3>
                            <span>
                              <label>Min Salary:</label>
                              <input type="number" min="0" step="50" />
                            </span>
                            {minSalaryError && (
                              <p className="error-message">{minSalaryError}</p>
                            )}
                            <span>
                              <label>Max Salary:</label>
                              <input type="number" min="0" step="50" />
                            </span>
                            {maxSalaryError && (
                              <p className="error-message">{maxSalaryError}</p>
                            )}
                          </div> */}

                          <div className="salaryRange">
                            <h3>Salary Range:</h3>
                            <span>
                              <label>Min Salary:</label>
                              <input
                                type="number"
                                value={minSalary}
                                onChange={handleMinSalaryChange}
                                min="0"
                                step="50"
                              />
                            </span>
                            {minSalaryError && (
                              <p className="error-message">{minSalaryError}</p>
                            )}
                            <span>
                              <label>Max Salary:</label>
                              <input
                                type="number"
                                value={maxSalary}
                                onChange={handleMaxSalaryChange}
                                min={parseInt(minSalary) + 50}
                                step="50"
                              />
                            </span>
                            {maxSalaryError && (
                              <p className="error-message">{maxSalaryError}</p>
                            )}
                          </div>
                          <button type="submit">Submit</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestMentorPage;
