import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import notification from '../../assets/notification.png';
import favorite from '../../assets/loveIcon.png';
import chat from "../../assets/messageIcon.png";
import userIcon from "../../assets/userIcon.png"
import searchIcon from "../../assets/searchIcon.png";
import mentoraLogo from "../../assets/mentoraLogo.png"
const Navbar = () => {
  const handleSearchClick = () => {
    console.log("Search clicked");
  };

  return (

    <nav className="navbar">
      <div className="MentoraLogo">
        <Link to="/home">
           <img src={mentoraLogo} alt="not found" />
        </Link>
      </div>
      <div className="search-bar">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <button onClick={handleSearchClick}>
            <img src={searchIcon} alt="not found" />
          </button>
        </div>
      </div>
      <div className="items">
       <div className="nav-item">
        <Link to="/notifications">
          <img src={notification} alt="not found" />
          <span>Notifications</span>
        </Link>
       </div>
       <div className="nav-item">
        <Link to="/favorites">
        <img src={favorite} alt="not found" />
          <span>Favorites</span>
        </Link>
       </div>
       <div className="nav-item">
        <Link to="/chat">
        <img src={chat} alt="not found" />
          <span>Chats</span>
        </Link>
       </div>
       <div className="nav-item">
        <Link to="/profile">
        <img src={userIcon} alt="not found" />
          <span>Me</span>
        </Link>
       </div>
      </div>
    </nav>
  );
};


export default Navbar;
