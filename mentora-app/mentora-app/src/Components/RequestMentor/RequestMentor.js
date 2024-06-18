import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftAside from "../Sidebar/Sidebar";
import "./RequestMentor.css";
import RequestMentorPage from "./Component/RequestMentorPage";

const Chats = () => {
  return (
    <div className="RequestMentor-container">
      <Navbar />
      <div className="RequestMentor-content-container">
        <LeftAside />
        <div className="RequestMentor-main-content">
          {/* <Post /> */}
          <RequestMentorPage />
        </div>
      </div>
    </div>
  );
};

export default Chats;
