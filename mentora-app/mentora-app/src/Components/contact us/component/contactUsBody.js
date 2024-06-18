import React from "react";
import "./contactUsBody.css"; 
import ContactUs from "../../../assets/contactUs.png";
import {
  FaEnvelope,
  FaFacebook,
  FaPhone,
  FaLinkedin,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

function App() {
  return (
    <div className="contactUss-container">
      <div className="contactUss-content">
        <div className="contact-container">
          <div className="header">
            <img src={ContactUs} alt="Header" className="header-image" />
          </div>
          <div className="contact-info">
            <h3 className="info-text">
              We're here to assist you every step of the way. Whether you have
              inquiries about our platform, partnership opportunities, or
              general questions, don't hesitate to get in touch. You can reach
              us through the following channels:
            </h3>
            <div className="contact-method">
              <a href="mailto:example@email.com">
                <FaEnvelope />
                <p>example@email.com</p>
              </a>
           
           
            </div>   <hr />
            <div className="contact-method">
              <a href="https://www.facebook.com/example">
                <FaFacebook />
                <p>facebook.com/example</p>
              </a>
           
            </div>   <hr />
            <div className="contact-method">
              <a href="tel:123-456-7890">
                <FaPhone />
                <p>123-456-7890</p>
              </a>
       
            </div>       <hr />
            <div className="contact-method">
              <a href="https://www.linkedin.com/in/example">
                <FaLinkedin />
                <p>linkedin.com/in/example</p>
              </a>
         
            </div>     <hr />
            <div className="contact-method">
              <a href="https://maps.google.com/?q=123+Street+City+Country">
                <FaMapMarkerAlt />
                <p>123 Street, City, Country</p>
              </a>
       
            </div>       <hr />
            <div className="contact-method">
              <a href="https://www.example.com">
                <FaGlobe />
                <p>www.example.com</p>
              </a>
         
            </div>    
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
