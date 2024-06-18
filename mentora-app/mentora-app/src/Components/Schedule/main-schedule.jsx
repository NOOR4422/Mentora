import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftAside from "../Sidebar/Sidebar";
import "./main-schedule.css";
import Schedule from "./component/Schedule";

const Chats = () => {
  return (
    <div className="schedule-container">
      <Navbar />
      <div className="schedule-content-container">
        <LeftAside />
        <div className="schedule-main-content">
          {/* <Post /> */}
          <Schedule />
        </div>
      </div>
    </div>
  );
};

export default Chats;
