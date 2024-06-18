import React from "react";
import plus from "../../assets/plus.png";
import "./RightSection.css";
import avatar from "../../assets/Default_avatar.png";
const MentorCard = ({ mentor }) => (
  <div className="card">
    <div className="card-info">
      <img src={avatar} alt={mentor.name} className="card-image" />
      <div className="card-content">
        <h3>{mentor.name} </h3>
        <p className="track">{mentor.track}</p> 
      </div>
    </div>
    <button className="view-profile-button">
       <img src={plus} alt="not found"/>
      View Profile
    </button>
  </div>
);

const RightSection = () => {
  const mentors = [
    {
      id: 1,
      name: "nour",
      track: "Web Development/node js",
    },
    {
      id: 2,
      name: "nour",
      track: "Web Development/node js",
    },
    {
      id: 3,
      name: "nour",
      track: "Web Development/node js",
    },
    {
      id: 4,
      name: "nour",
      track: "Web Development/node js",
    },
    
    
  ];

  return (
    <div >
        <h2 className="RightSection-header">Recommended Mentors</h2>
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
    </div>
  );
};

export default RightSection;
