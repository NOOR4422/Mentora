import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import AboutUsBody from './component/AboutUsBody'
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="AboutUs-container">
      <Navbar />
      <div className="AboutUs-container">
        <Sidebar />
        <div className="AboutUs-main-content">
          {/* <Post /> */}
          <AboutUsBody />
          {/* <ChatPageBody/> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
