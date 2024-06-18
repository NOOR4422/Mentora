import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import AboutUsBody from './component/contactUsBody'
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contactUs-container">
      <Navbar />
      <div className="contactUs-container">
        <Sidebar />
        <div className="contactUs-main-content">
          
          <AboutUsBody />
          
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
