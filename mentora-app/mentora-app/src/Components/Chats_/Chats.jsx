import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
// import Post from "./Component/Post";
import ChatPage from "./Component/ChatPage";
import "./Chats.css";

const Chats = () => {
  return (
    <div className="chat-container">
      <Navbar />
      <div className="chat-content-container">
        <Sidebar />
        <div className="chat-main-content">
          {/* <Post /> */}
          <ChatPage />
        </div>
      </div>  
    </div>
  );
};

export default Chats;
