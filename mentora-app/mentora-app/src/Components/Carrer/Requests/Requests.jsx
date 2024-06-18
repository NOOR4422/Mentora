import React, { useState } from "react";
import "./Requests.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Requests() {
  const [activePage, setActivePage] = useState("requests");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [Salary, setSalary] = useState("");
  const [timeError, setTimeError] = useState("");
  const [dateError, setDateError] = useState("");
  const [SalaryError, setSalaryError] = useState("");
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Nour Shazly",
      trackName: "Web Development",
      trackType: "Full Stack",
      imageUrl: "https://via.placeholder.com/150",
      requestDate: new Date(),
      reason: "I want to improve my skills.",
      duration: "3 months",
      language: "English",
      minSalary: "$50,000",
      maxSalary: "$70,000",
    },
    {
      id: 2,
      name: "Nour Shazly",
      trackName: "Data Science",
      trackType: "Machine Learning",
      imageUrl: "https://via.placeholder.com/150",
      requestDate: new Date(),
      reason: "I want to switch careers.",
      duration: "6 months",
      language: "English",
      minSalary: "$60,000",
      maxSalary: "$90,000",
    },
  ]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [detailsPopup, setDetailsPopup] = useState(false);
  const [showAcceptForm, setShowAcceptForm] = useState(false);

  const handleReject = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleAccept = (request) => {
    setSelectedRequest(request);
    setShowAcceptForm(true);
  };

  const handleSubmit = async () => {
    let valid = true;

    if (!date) {
      setDateError("Please select a date for the session.");
      valid = false;
    } else {
      setDateError("");
    }

    if (!time) {
      setTimeError("Please select a time for the session.");
      valid = false;
    } else {
      setTimeError("");
    }

    if (!Salary) {
      setSalaryError("Please enter a minimum salary.");
      valid = false;
    } else {
      setSalaryError("");
    }


    if (!valid) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowPopup(true);
      setRequests(requests.filter((req) => req.id !== selectedRequest.id));
      setSelectedRequest(null);
      setDate("");
      setTime("");
      setSalary("");
      setShowAcceptForm(false);
    } catch (error) {
      console.error("Error accepting the request:", error);
    }
  };

  const handleDetailsClick = (request) => {
    setSelectedRequest(request);
    setDetailsPopup(true);
    setShowAcceptForm(false); // Ensure accept form is hidden when details popup is shown
  };

  const handleCloseDetails = () => {
    setDetailsPopup(false);
  };

  return (
    <div className="contactUss-container">
      <div className="contactUss-content">
        <div className="App">
          <header>
            <div className="top-bar">
              <div className="box" onClick={() => setActivePage("requests")}>
                Requests
              </div>
              <div className="box" onClick={() => setActivePage("training")}>
                Training
              </div>
              <div className="box" onClick={() => setActivePage("sessions")}>
                Sessions
              </div>
            </div>
          </header>
          {activePage === "requests" && (
            <div className="requests-container">
              <h2>Mentorship Requests</h2>
              {requests.map((request) => (
                <div key={request.id} className="request-wrapper">
                  <div
                    className="request-card"
                    onClick={() => handleDetailsClick(request)}
                  >
                    <div className="request-left">
                      <img src={request.imageUrl} alt={request.name} />
                      <div className="request-info">
                        <h4>{request.name}</h4>
                        <p>{request.trackName}</p>
                        <p>{request.trackType}</p>
                      </div>
                    </div>
                    <div className="request-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAccept(request);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="reject"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(request.id);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                  {showAcceptForm &&
                    selectedRequest &&
                    selectedRequest.id === request.id && (
                      <div className="accept-form">
                        <h3>Schedule a Session with {request.name}</h3>
                        <div className="time-date">
                          <div className="form-group">
                            <label>Time:</label>
                            <input
                              type="time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                            />
                            {timeError && (
                              <small className="error">{timeError}</small>
                            )}
                          </div>
                          <div className="form-group">
                            <label>Date:</label>
                            <input
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                            {dateError && (
                              <small className="error">{dateError}</small>
                            )}
                          </div>
                        </div>
                        <div className="salary-range">
                          <div className="form-group2">
                            <label>Session Salary:</label>
                            <input
                            type="text"
                            />
                            {SalaryError && (
                              <small className="error">{SalaryError}</small>
                            )}
                          </div>
                         
                        </div>
                        <button onClick={handleSubmit}>Submit</button>
                      </div>
                    )}
                </div>
              ))}
              {detailsPopup && selectedRequest && (
                <div className="details-popup">
                  <div className="details-popup-content">
                    <h3>Request Details</h3>
                    <p>Name: {selectedRequest.name}</p>
                    <p>Track Name: {selectedRequest.trackName}</p>
                    <p>Track Type: {selectedRequest.trackType}</p>
                    <p>
                      Request Date:{" "}
                      {selectedRequest.requestDate.toLocaleDateString()}
                    </p>
                    <p>Reason: {selectedRequest.reason}</p>
                    <p>Duration: {selectedRequest.duration}</p>
                    <p>Language: {selectedRequest.language}</p>
                    <p>
                      Salary Range: {selectedRequest.minSalary} -{" "}
                      {selectedRequest.maxSalary}
                    </p>
                    <button onClick={handleCloseDetails}>Close</button>
                  </div>
                </div>
              )}
              {showPopup && (
                <div className="popup">
                  <div className="popup-content">
                    <div className="close" onClick={() => setShowPopup(false)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className="success">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="success-icon"
                      />
                      <h3>Success</h3>
                    </div>
                    <p>Request Accepted Successfully!</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Requests;
