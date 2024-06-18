import React, { useState, useEffect } from "react";
import "./Schedule.css";
import { FaCalendar, FaClock , FaLink } from "react-icons/fa";

function Schedule() {
 const [events] = useState([
   {
     id: 1,
     name: "Event 1",
     date: "2024-06-15",
     time: "10:00 AM",
     daysLeft: 4,
     meeting: "https://zoom.us/",
     details: "Details about event 1",
   },
   {
     id: 2,
     name: "Event 2",
     date: "2024-06-20",
     time: "2:00 PM",
     meeting: "https://zoom.us/",

     daysLeft: 9,
     details: "Details about event 2",
   },
   {
     id: 3,
     name: "Event 2",
     date: "2024-06-20",
     time: "2:00 PM",
     meeting: "https://zoom.us/",

     daysLeft: 9,
     details: "Details about event 2",
   },
   {
     id: 4,
     name: "Event 2",
     date: "2024-06-20",
     time: "2:00 PM",
     meeting: "https://zoom.us/",

     daysLeft: 9,
     details: "Details about event 2",
   },
 ]);
 const [selectedEvent, setSelectedEvent] = useState(null);

 const handleDetailsClick = (event) => {
   setSelectedEvent(event);
 };

 const handleCloseClick = () => {
   setSelectedEvent(null);
 };

  
  
  
  return (
    <div className="Schedule-main">
      <div className="schedule2-container">
        <div className="Schedule-content">
          <div className="schedule-page">
            <h1>Mentor Schedule</h1>
            {events.map((event) => (
              <div key={event.id} className="schedule-item">
                <div className="schedule-item-left">
                  <h3>{event.name}</h3>
                  <div className="info-row">
                    <FaCalendar />
                    <span>{event.date}</span>
                  </div>
                  <div className="info-row">
                    <FaClock />
                    <span>{event.time}</span>
                  </div>
                  <div className="info-row">
                    <FaLink />
                    <a>{event.meeting}</a>
                  </div>
                  <p className="days-left">Days left: {event.daysLeft}</p>
                </div>
                <div className="schedule-item-right">
                  <button onClick={() => handleDetailsClick(event)}>
                    Details
                  </button>
                </div>
              </div>
            ))}
            {selectedEvent && (
              <div className="popup">
                <div className="popup-inner">
                  <h2>{selectedEvent.name}</h2>
                  <p>Date: {selectedEvent.date}</p>
                  <p>Time: {selectedEvent.time}</p>
                  <p>Details: {selectedEvent.details}</p>
                  <button onClick={handleCloseClick}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
