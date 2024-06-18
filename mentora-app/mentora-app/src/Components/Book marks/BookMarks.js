import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftAside from "../Sidebar/Sidebar";
import BookMarksBody from "./component/BookMarksBody";
import "./BookMarks.css";

const BookMarks = () => {
  return (
    <div className="BookMarks-container">
      <Navbar />
      <div className="BookMarks-content-container">
        <LeftAside />
        <div className="BookMarks-main-content">
          {/* <Post /> */}
          <BookMarksBody />
          {/* <ChatPageBody/> */}
        </div>
      </div>
    </div>
  );
};

export default BookMarks;
