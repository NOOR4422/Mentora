import React, { useState } from "react";
import "./Sessions.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faCalendarAlt,
  faTimes,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FaCalendar, FaClock, FaLink } from "react-icons/fa";

function App() {
  const [activePage, setActivePage] = useState("sessions");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const [sessionLink, setSessionLink] = useState("");

  const [events] = useState([
    {
      id: 1,
      name: "React Session",
      date: "2024-06-20",
      time: "2:00 PM",
      meeting: "https://zoom.us/",
      create: "15/12/2023",
      daysLeft: 9,
      NOfMentee: 10,
      description: "This session for learning react basics",
      details: "Details about event 2",
    },
    {
      id: 2,
      name: "React Session",
      date: "2024-06-20",
      time: "2:00 PM",
      meeting: "https://zoom.us/",
      create: "15/12/2023",
      daysLeft: 9,
      NOfMentee: 10,
      description: "This session for learning react basics",
      details: "Details about event 2",
    },
  ]);

  const [previousSessions, setPreviousSessions] = useState([
    // {
    //   title: "Session 1",
    //   link: "https://example.com/session1",
    //   time: "10:00",
    //   date: "2024-06-01",
    // },
    // {
    //   title: "Session 2",
    //   link: "https://example.com/session2",
    //   time: "14:00",
    //   date: "2024-06-05",
    // },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDetailsClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseClick = () => {
    setSelectedEvent(null);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleCreateSession = async () => {
    let validationErrors = {};
    if (!title) validationErrors.title = "Title is required";
    if (!description) validationErrors.description = "Description is required";
    if (!time) validationErrors.time = "Time is required";
    if (!date) validationErrors.date = "Date is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newSession = {
      title,
      description,
      time,
      date,
      link: "https://example.com/" + title.replace(/\s+/g, "").toLowerCase(),
    };

    try {
      await axios.post(
        "http://localhost:4000/api/session/664b960d4b81e3269148f586",
        newSession
      );
      setPreviousSessions([...previousSessions, newSession]);
      setTitle("");
      setDescription("");
      setTime("");
      setDate("");
      setErrors({});
      setShowPopup(true); 
    } catch (error) {
      console.error("There was an error creating the session!", error);
    }
   
  };

  const handleUploadLink = () => {
    if (!sessionLink) {
      alert("Please enter a session link");
      return;
    }

    const currentDate = new Date();
    const newSession = {
      title: `Session on ${currentDate.toDateString()}`,
      link: sessionLink,
      time: currentDate.toLocaleTimeString(),
      date: currentDate.toLocaleDateString(),
    };

    setPreviousSessions([...previousSessions, newSession]);
    setSessionLink("");
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
          {activePage === "sessions" && (
            <div className="sessions">
              <div className="session-container">
                <h2>My Sessions</h2>
                {events.map((event) => (
                  <div key={event.id} className="session-item">
                    <div className="session-item-left">
                      <h4>{event.name}</h4>
                      <div className="info-row">
                        <FaCalendar />
                        <span>Created at : {event.create}</span>
                      </div>
                    </div>
                    <div className="session-item-right">
                      <button onClick={() => handleDetailsClick(event)}>
                        Details
                      </button>
                    </div>
                  </div>
                ))}
                {selectedEvent && (
                  <div className="session-popup">
                    <div className="session-popup-inner">
                      <h2>{selectedEvent.name}</h2>
                      <p>Date: {selectedEvent.date}</p>
                      <p>Time: {selectedEvent.time}</p>
                      <p>Details: {selectedEvent.details}</p>
                      <p>Description: {selectedEvent.description}</p>
                      <p>Number Of Mentee: {selectedEvent.NOfMentee}</p>
                      <button onClick={handleCloseClick}>Close</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="session-container">
                <h2>Create Session</h2>
                <div className="form-group">
                  <label>Session Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && <small>{errors.title}</small>}
                </div>
                <div className="form-group">
                  <label>Session Description:</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && <small>{errors.description}</small>}
                </div>
                <div className="time-date">
                  <div className="form-group">
                    <label>Time:</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                    {errors.time && <small>{errors.time}</small>}
                  </div>
                  <div className="form-group">
                    <label>Date:</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && <small>{errors.date}</small>}
                  </div>
                </div>
                <button onClick={handleCreateSession}>Create Session</button>
              </div>

              <div className="session-container">
                <h2>Upload Session Link</h2>
                <div className="form-group">
                  <label>Session Link:</label>
                  <input
                    type="text"
                    value={sessionLink}
                    onChange={(e) => setSessionLink(e.target.value)}
                  />
                              <button onClick={handleUploadLink}>Upload</button>
  </div>
              </div>

              <div className="session-container">
                <h2>Sessions Records</h2>
                <div className="previous-sessions">
                  {previousSessions.map((session, index) => (
                    <div key={index} className="previous-session">
                      <a
                        href={session.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faLink} />
                      </a>
                      <div className="session-info">
                        <div>
                          <strong>{session.title}</strong>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                          {session.date} at {session.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="close" onClick={() => setShowPopup(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="sucess">
              <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
              <h3>Success</h3>
            </div>
            <p>Session Created Successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
