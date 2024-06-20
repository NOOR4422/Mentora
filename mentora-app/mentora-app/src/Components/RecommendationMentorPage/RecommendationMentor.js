import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftAside from "../Sidebar/Sidebar";
import "./RecommendationMentor.css";
import RecommendationMentor from "./Component/RecommendationMentorPage";
import Recommendation from './Component/RecommendationMentorPage'
const Chats = () => {
  return (
    <div className="RequestMentor-container">
      <Navbar />
      <div className="RequestMentor-content-container">
        <LeftAside />
        <div className="RequestMentor-main-content">
          {/* <Post /> */}
          {/* <RequestMentorPage /> */}
          <Recommendation/>
        </div>
      </div>
    </div>
  );
};

export default Chats;
