import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar"
// import Post from "./Component/Post";
import ChatPage from "./Component/CommunityPage";
import "./Community.css";

const Community = () => {
  return (
    <div className="Community-container-all">
      <Navbar />
      <div className="content-container-community">
        <Sidebar/>
        <div className="main-content-community">
         
          <ChatPage />
          
        </div>
      </div>
    </div>
  );
};

export default Community;
