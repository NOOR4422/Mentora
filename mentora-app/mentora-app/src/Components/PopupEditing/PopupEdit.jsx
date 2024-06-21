import { React, useState } from 'react'
// import { v4 as uuidv4 } from 'uuid';
import { editArticle, setArticles, postArticleToAPI } from '../../redux/Articles/articlesActions';
import "../Popup/Popup.css"
import ReactPlayer from 'react-player';
import exit from "../../assets/exit.png";
import defaultimage from "../../assets/Default_avatar.png"
import upload from "../../assets/uploadphoto.png";
import urlIcon from "../../assets/urlIcon.png";
import photoIcon from "../../assets/photoIcon.png";
import videoIcon from "../../assets/video.png";
import { useSelector, useDispatch } from "react-redux";
const PopupEdit = ({ type, ShowPopup, handleShowPopup, editArticleData, handlePopupType, handleOverlay }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.register.userData);
  const { firstName, lastName } = userData;
  const articles = useSelector(state => state.articles.articles);


  const [textarea, setTextarea] = useState('');
  const [photo, setPhoto] = useState('');
  const [url, setUrl] = useState('');
  const [videoUploaded, setVideoUploaded] = useState('');

  // \
  const rest = () => {
    setPhoto('');
    setUrl('');
    setTextarea('');
    setVideoUploaded('')
    handleShowPopup();
    handleOverlay(false);
  }
  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`oops this is not an image ,the file is ${typeof image}`);
      return
    }
    setPhoto(image);
    setVideoUploaded('')
    setUrl('')
  }

  const handleVideo = (e) => {
    const video = e.target.files[0];
    if (video === '' || video === undefined) {
      alert(`oops this is not an video ,this file is ${typeof video}`);
      return
    }
    setVideoUploaded(video);
    setUrl('')
  }
  const handleEdit = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    rest(e)
    const updatedArticleData = {
      id: editArticleData.id,
      description: textarea,
      videoUploaded: videoUploaded,
      username: firstName + lastName,
      image: photo,
      video: url,
      isImage: !!photo,
      isVideo: !!url,
      isVideoUploaded: videoUploaded ? true : false,
    };
    const newArticlesAfterEdit = [updatedArticleData];
    dispatch(editArticle(editArticleData.id, newArticlesAfterEdit));

    const currentArticles = [...articles];
    const index = currentArticles.findIndex(article => article.id === editArticleData.id);
    const newArticles = [...currentArticles.slice(0, index), updatedArticleData, ...currentArticles.slice(index + 1)];
    dispatch(setArticles(newArticles));
    dispatch(postArticleToAPI(newArticles));
    handleShowPopup();
    handleOverlay(false);

  }

  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    ShowPopup &&
    <>
      <div className='popup-container'>
        <div className="popup-header">
          <span>create a post</span>
          <img src={exit} alt="not found" onClick={rest} />
        </div>
        <div className="popup-user-info">
          <img src={defaultimage} alt="not found" />
          <span>{firstName}{lastName}</span>
        </div>
        <textarea placeholder='what do you want  to talk about ?' className='textarea' autoFocus={true} onChange={(e) => { setTextarea(e.target.value) }} />
        {type === "photo" ?
          <>
            <input id="inputfile" type='file' className='inputfile' onChange={handleImage} />
            <label htmlFor='inputfile' className='labelphoto'>
              <span>select  an image to share</span>
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
                    <input id="inputurl" type='text' className='inputurl' placeholder='plz input a video link' value={url} onChange={(e) => { setUrl(e.target.value); setVideoUploaded(''); }} />
                    <img src={urlIcon} alt="not found" />
                  </div>
                  {url ? <ReactPlayer width="100%" height="200px" url={url} /> : ""}
                </>
                :
                selectedOption === 'Upload Video' ?
                  <>
                    <input id="inputfilevideo" type='file' className='inputfile' onChange={handleVideo} />
                    <label htmlFor='inputfilevideo' className='labelphoto'>
                      <span>select  a video to share</span>
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
            :
            ""}
        <div className="popup-footer">
          <div className="icons">
            <img src={photoIcon} alt="not found" onClick={() => { handlePopupType('photo'); setUrl(''); }} />
            <img src={videoIcon} alt="not found" onClick={() => { handlePopupType('video'); setPhoto(''); }} />
          </div>
          <button disabled={!textarea ? true : false} className={textarea.length !== 0 ? "" : "disabled"} onClick={handleEdit}>edit</button>
        </div>
      </div>
    </>
  )
}

export default PopupEdit; 
