import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftAside from "../Sidebar/Sidebar";
import "./Carrer.css";
import Requests from './Requests/Requests'
import Session from './Seesions/Sessions'
const Carrer = () => {
  return (
    <div className="Schedule-container">
      <Navbar />
      <div className="Schedule-content-container">
        <LeftAside />

        <div className="Schedule-main-content">
          <Session />
{/* <Requests/> */}
       
        </div>
      </div>
    </div>
  );
};

export default Carrer;
