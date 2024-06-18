// CommunityPage.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./CommunityPage.css";
import CommunityRightSection from "./CommunityRightSection.jsx";
import plus from"../../../assets/plus-colored.png"
import Create from "../../../assets/createcommunity.png"
import join from "../../../assets/joincommunity.png"
import exit from "../../../assets/exitcommunity.png"
const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const handleCommunityClick = (communityId) => {
    setSelectedCommunity(
      communityId === selectedCommunity ? null : communityId
    );
  };
  const communityData = [
    {
      id: 1,
      name: "React Community",
      lastMessage: "Hello there!",
      time: "12:30 PM",
      read: true,
    },
    {
      id: 2,
      name: "Node.js Community",
      lastMessage:
        "Hello there Hello thereHello thereHello thereHello thereHello thereHello thereHello thereHello thereHello thereHello thereHello there!",
      time: "12:30 PM",
      read: true,
    },
  ];

  const filteredCommunities = communityData.filter(
    (community) =>
      community.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
   
  const [Plus,setPlus]=useState(false);
  const handelCreateAndJoinCommunity =()=>{
    setPlus(!Plus);
  }


  const [overlay,setOverlay] =useState(false);
  const handleOverlay =()=>{
   setOverlay(!overlay);
  }
  const [showCreatePopup,setShowCreatePopup]=useState(false);
  const handelshowCreatePopup =()=>{
    setShowCreatePopup(!showCreatePopup);
    handleOverlay();
    if(!showCreatePopup){
      setPlus(false)
    }
  }
  const [showFindPopup,setShowFindPopup]=useState(false);
  const handelshowFindPopup =()=>{
    setShowFindPopup(!showFindPopup);
    handleOverlay();
    if(!showFindPopup){
      setPlus(false)
    }
  }

  return (
    <div className="all-community-container">
      <div className="community-container">
        <div className="communities-sidebar">
          <div className="fixed-div">
            <div className="header">
              <h2>Community</h2>
               {Plus?
               <img src={exit} alt="not found"  onClick={handelCreateAndJoinCommunity}/>
               :
               <img src={plus} alt="not found"  onClick={handelCreateAndJoinCommunity}/>
              }
             
            </div>
            {Plus?
             <div className="showpopupCreateAndJoin">
              <div className="CreateCommunity"  onClick={handelshowCreatePopup}>
                 <p>Create community</p>
                 <img src={Create} alt="not found" />
              </div>
              <div className="joinCommunity" onClick={handelshowFindPopup}>
                 <p>Find community</p>
                 <img src={join} alt="not found" />
              </div>
             </div>
            :''}
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
          </div>
          <div className="communities-list">
            {filteredCommunities.map((community) => (
              <div
                key={community.id}
                className={`community-item ${
                  selectedCommunity === community.id ? "selected" : ""
                }`}
                onClick={() => handleCommunityClick(community.id)}
              >
                <div className="info">
                  <div>
                    <span>
                      <h3>{community.name}</h3>
                    </span>
                  </div>
                  <span className="last-message">
                    <span className="last-message-text">
                      {community.lastMessage}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="community-page-container">
          <div className="community-page">
            <CommunityRightSection  showFindPopup={showFindPopup} handelshowFindPopup={handelshowFindPopup} showCreatePopup={showCreatePopup} handelshowCreatePopup={handelshowCreatePopup} overlay={overlay}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
