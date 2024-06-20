import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { postArticleToAPI, setArticles } from '../../redux/Articles/articlesActions';
import "./Popup.css";
import ReactPlayer from 'react-player';
import exit from "../../assets/exit.png";
import defaultimage from "../../assets/Default_avatar.png";
import upload from "../../assets/uploadphoto.png";
import urlIcon from "../../assets/urlIcon.png";
import photoIcon from "../../assets/photoIcon.png";
import videoIcon from "../../assets/video.png";
import { User } from "../Context/userContext";

const Popup = ({ type, ShowPopup, handleShowPopup, handlePopupType, editArticleData }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.register.userData);
  const articles = useSelector(state => state.articles.articles);
  const reversedArticles = [...articles].reverse();
  const { auth } = useContext(User);
  const { firstName, lastName } = userData;
  const [textarea, setTextarea] = useState('');
  const [photo, setPhoto] = useState('');
  const [url, setUrl] = useState('');
  const [videoUploaded, setVideoUploaded] = useState('');

  useEffect(() => {
    if (editArticleData) {
      setVideoUploaded(editArticleData.videoUploaded || '');
    }
  }, [editArticleData]);

  const reset = () => {
    setPhoto('');
    setUrl('');
    setTextarea('');
    setVideoUploaded('');
    handleShowPopup();
  };

  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`Oops, this is not an image, the file is ${typeof image}`);
      return;
    }
    setPhoto(image);
  };

  const handleVideo = (e) => {
    const video = e.target.files[0];
    if (video === '' || video === undefined) {
      alert(`Oops, this is not a video, the file is ${typeof video}`);
      return;
    }
    setVideoUploaded(video);
    setUrl('');
  };

  const handlePostArticles = async (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const formData = new FormData();
    formData.append('id', uuidv4());
    formData.append('image', photo);
    formData.append('video', url);
    formData.append('videoUploaded', videoUploaded);
    formData.append('username', firstName + lastName);
    formData.append('description', textarea);
    formData.append('isImage', photo ? true : false);
    formData.append('isVideo', url ? true : false);
    formData.append('isVideoUploaded', videoUploaded ? true : false);

    try {
      const response = await axios.post(
        'https://mentora-5s1z.onrender.com/api/post/addpost',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${auth.Token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 200) {
        const newArticles = [...reversedArticles, response.data];
        dispatch(setArticles(newArticles));
        dispatch(postArticleToAPI(newArticles));
        reset(e);
      }
    } catch (error) {
      console.error("Error posting the article:", error);
    }
  };

  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    ShowPopup && 
    <>
      <div className='popup-container'>
        <div className="popup-header">
          <span>Create a post</span>
          <img src={exit} alt="not found" onClick={reset} />
        </div>
        <div className="popup-user-info">
          <img src={defaultimage} alt="not found" />
          <span>{firstName}{lastName}</span>
        </div>
        <textarea 
          placeholder='What do you want to talk about?' 
          className='textarea' 
          value={textarea} 
          autoFocus={true} 
          onChange={(e) => { setTextarea(e.target.value); }} 
        />
        {type === "photo" ? 
          <>
            <input id="inputfile" type='file' className='inputfile' onChange={handleImage} />
            <label htmlFor='inputfile' className='labelphoto'>
              <span>Select an image to share</span>
              <img src={upload} alt="not found" />
            </label>
            {photo ? <img src={URL.createObjectURL(photo)} className='photoshared' alt='not found' /> : ''}
          </> 
          : 
          type === "video" ? 
          <>
            <div className="twoOptions">
              <label>
                <input type="radio" value="Link" checked={selectedOption === 'Link'} onChange={handleOptionChange} />
                <p>Link</p> 
              </label>
              <label>
                <input type="radio" value="Upload Video" checked={selectedOption === 'Upload Video'} onChange={handleOptionChange} />
                <p>Upload Video</p>
              </label>
            </div>
            {selectedOption === 'Link' ? 
              <>
                <div className="urlinput">
                  <input id="inputurl" type='text' className='inputurl' placeholder='Please input a video link' value={url} onChange={(e) => { setUrl(e.target.value); setVideoUploaded(''); }} />
                  <img src={urlIcon} alt="not found" />
                </div>
                {url ? <ReactPlayer width="100%" height="200px" url={url} /> : ""}
              </> 
              : 
              selectedOption === 'Upload Video' ? 
              <>
                <input id="inputfilevideo" type='file' className='inputfile' onChange={handleVideo} />
                <label htmlFor='inputfilevideo' className='labelphoto'>
                  <span>Select a video to share</span>
                  <img src={upload} alt="not found" />
                </label>
                {videoUploaded ? 
                  <video controls style={{ width: '100%', height: '200px' }}>
                    <source src={URL.createObjectURL(videoUploaded)} type={videoUploaded.type} />
                  </video> 
                  : ''}
              </> 
              : ''}
          </>
          : ""}
        <div className="popup-footer">
          <div className="icons">
            <img src={photoIcon} alt="not found" onClick={() => { handlePopupType('photo'); setUrl(''); }} />
            <img src={videoIcon} alt="not found" onClick={() => { handlePopupType('video'); setPhoto(''); }} />
          </div>
          <button disabled={!textarea} className={textarea.length !== 0 ? "" : "disabled"} onClick={(e) => { handlePostArticles(e); }}>Post</button>
        </div>
      </div>
    </>
  );
};

export default Popup;
