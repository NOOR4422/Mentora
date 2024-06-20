import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./RecommendationMentorPage.css";

const RequestMentorPage = () => {
 const mentors = [
   {
     id: 1,
     image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
     name: "John Doe",
     experience: "10 years",
     specialization: "AI and Machine Learning",
     rating: 4.7,
   },
   {
     id: 2,
     image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
     name: "Jane Smith",
     experience: "8 years",
     specialization: "Leadership and Management",
     rating: 4.9,
   },

   {
     id: 3,
     image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
     name: "Michael Johnson",
     experience: "12 years",
     specialization: "Software Development",
     rating: 4.5,
   },
   {
     id: 4,
     image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
     name: "Emily Davis",
     experience: "6 years",
     specialization: "UX/UI Design",
     rating: 4.8,
   },
   {
     id: 3,
     image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
     name: "Michael Johnson",
     experience: "12 years",
     specialization: "Software Development",
     rating: 4.5,
   },
   {
     id: 4,
     image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
     name: "Emily Davis",
     experience: "6 years",
     specialization: "UX/UI Design",
     rating: 4.8,
   }, {
     id: 3,
     image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
     name: "Michael Johnson",
     experience: "12 years",
     specialization: "Software Development",
     rating: 4.5,
   },
   {
     id: 4,
     image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
     name: "Emily Davis",
     experience: "6 years",
     specialization: "UX/UI Design",
     rating: 4.8,
   },
 ];
  return (
    <div className="all-RequestMentor-container">
      <div className="RequestMentor-Container">
        <div className="RequestMentor-page-container">
          <div className="mentor-page">
            <h1 className="page-title">Recommendation Mentor </h1>
            <div className="mentor-list">
              {mentors.map((mentor, index) => (
                <div key={mentor.id} className="mentor-card">
                  <div className="mentor-image2">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="mentor-image"
                    />
                  </div>
                  <div className="mentor-details">
                    <h3 className="mentor-name">{mentor.name}</h3>
                    <p className="mentor-info">
                      <strong>Experience:</strong> {mentor.experience}
                    </p>
                    {mentor.specialization && (
                      <p className="mentor-info">
                        <strong>Specialization:</strong> {mentor.specialization}
                      </p>
                    )}
                    <p className="mentor-info">
                      <strong>Rating:</strong> {mentor.rating}
                    </p>
                    <button className="view-profile-btn">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestMentorPage;
