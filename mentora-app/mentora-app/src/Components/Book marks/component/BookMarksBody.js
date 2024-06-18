import React, { useState, useEffect } from "react";
import "./BookMarksBody.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bookmarkImage from './Empty-amico.png'
import {
  faHeart,
  faComment,
  faBookmark,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

function BookMarks() {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const savedPostsFromStorage =
      JSON.parse(localStorage.getItem("savedPosts")) || [];
    setSavedPosts(savedPostsFromStorage);
  }, []);

  const handleRemove = (index) => {
    const updatedSavedPosts = savedPosts.filter((post, i) => i !== index);
    localStorage.setItem("savedPosts", JSON.stringify(updatedSavedPosts));
    setSavedPosts(updatedSavedPosts);
  };

  const handleLove = (index) => {
    const updatedSavedPosts = [...savedPosts];
    updatedSavedPosts[index].isLoved = !updatedSavedPosts[index].isLoved;
    localStorage.setItem("savedPosts", JSON.stringify(updatedSavedPosts));
    setSavedPosts(updatedSavedPosts);
  };

  return (
    <div className="bookmark-main">
      {savedPosts.length === 0 ? (
        <div className="BookMarkss-container">
          <div className="BookMarkss-content">
            <div className="bookmarkImage-container">
              <img
                className="bookmark-image"
                src={bookmarkImage}
                alt="Top Image"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="BookMarkss-container">
          {savedPosts.map((post, index) => (
            <div key={index} className="BookMarkss-content">
              <div className="bookmarkImage-container">
                <div className="BookMarkpost-container">
                  <div className="BookMarkpost-details">
                    <div className="BookMarkprofile-info">
                      <img
                        src={post.person.profilePicture}
                        alt={post.person.name}
                      />
                      <div>
                        <div className="BookMarkprofile-name">
                          {post.person.name}
                        </div>
                        <span className="BookMarkpost-time">{post.time}</span>
                      </div>
                    </div>
                    <p className="BookMarkpost-content">{post.content}</p>
                    <img
                      className="bookmarkpost-image"
                      src={post.image}
                      alt="Saved Post"
                    />{" "}
                  </div>
                  <div className="BookMarkaction-box">
                    <div
                      className="BookMarkaction-item"
                      onClick={() => handleLove(index)}
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={`BookMarkaction-icon ${
                          post.isLoved ? "BookMark-loved" : "BookMark-love"
                        }`}
                      />
                      <span
                        className={`BookMark-action-icon ${
                          post.isLoved
                            ? "BookMark-action-text-loved"
                            : "BookMark-action-text-love"
                        }`}
                      >
                        {" "}
                        {post.isLoved ? "Loved" : "Love"}
                      </span>
                    </div>
                    <div className="BookMarkaction-item">
                      <FontAwesomeIcon
                        icon={faComment}
                        className="BookMarkaction-icon"
                      />
                      <span className="BookMarkaction-text">Comment</span>
                    </div>
                    <div
                      className="BookMarkaction-item"
                      onClick={() => handleRemove(index)}
                    >
                      <FontAwesomeIcon
                        icon={faBookmark}
                        className="BookMarkaction-icon Saved"
                      />
                      <span className="BookMarkaction-text">Remove</span>
                    </div>
                    <div className="BookMarkaction-item">
                      <FontAwesomeIcon icon={faShare} className="action-icon" />
                      <span className="BookMarkaction-text">Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookMarks;
