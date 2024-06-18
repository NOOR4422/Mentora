import React from 'react';
import defalutAvatar from "../../assets/Default_avatar.png"
import './PublishBox.css';
import vidoeIcon from "../../assets/video.png";
import articleIcon from "../../assets/articleIcon.png";
import photoIcon from "../../assets/photoIcon.png";
const PublishBox = ({handleShowPopup ,handlePopupType}) => {
  const handleClick = (type) => {
    handlePopupType(type);
    handleShowPopup();
  };
  return (
    <div className="publish-box">
      <div className="user-info">
        <img className="user-image" src={defalutAvatar} alt="not found"/>
        <input onClick={() => handleClick('article')} className="input-field" type="text" placeholder="Share what’s on your mind..." readOnly/>
      </div>

      <div className="publish-options">
        <div className="publish-link" onClick={() => handleClick('video')}>
          <img src={vidoeIcon} alt='not found'/>
          <span className="action-text">Video</span>
        </div>
        <div className="publish-link" onClick={() => handleClick('article')}>
          <img src={articleIcon} alt='not found'/>
          <span className="action-text">Write Article</span>
        </div>
        <div className="publish-link" onClick={() => handleClick('photo')}>
          <img src={photoIcon} alt='not found'/>
          <span className="action-text">Photo</span>
        </div>
      </div>
    </div>
  );
};

export default PublishBox;
















     