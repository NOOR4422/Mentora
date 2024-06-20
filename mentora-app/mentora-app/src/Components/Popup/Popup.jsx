import {React,useState,useEffect,useContext} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux'; 
import {  postArticleToAPI, setArticles } from '../../redux/Articles/articlesActions';
import "./Popup.css"
import axios from "axios"; 
import ReactPlayer from 'react-player';
import exit from "../../assets/exit.png";
import defaultimage from "../../assets/Default_avatar.png"
import upload from "../../assets/uploadphoto.png";
import urlIcon from "../../assets/urlIcon.png";
import photoIcon from "../../assets/photoIcon.png";
import videoIcon from "../../assets/video.png";
import { useSelector } from "react-redux";
import { User } from "../Context/userContext";

const Popup = ({type,ShowPopup,handleShowPopup,handlePopupType,editArticleData}) => {
  const dispatch = useDispatch();
  const { auth } = useContext(User);
  const userData = useSelector(state => state.register.userData);
  const articles = useSelector(state => state.articles.articles);
  const reversedArticles = [...articles].reverse();

  const {firstName ,lastName} =userData;
  const [textarea, setTextarea] = useState('');
const [photo, setPhoto] = useState('');
const [url, setUrl] = useState('');
const [videoUploaded,setVideoUploaded]=useState('');
useEffect(() => {
  // Update videoUploaded state when editArticleData changes
  if (editArticleData) {
    setVideoUploaded(editArticleData.videoUploaded || '');
  }
}, [editArticleData]);
  const rest=()=>{
    setPhoto('');
    setUrl('');
    setTextarea('');
    setVideoUploaded('')
    handleShowPopup();
   
  }
  const handleImage=(e)=>{
    const image = e.target.files[0];
    if(image==="" || image === undefined){
        alert(`oops this is not an image ,the file is ${typeof image}`);
        return
    }
    setPhoto(image);
  }
  const handleVideo =(e)=>{
    const video =e.target.files[0];
    if(video===''|| video ===undefined){
      alert(`oops this is not an video ,this file is ${typeof video}`);
        return
    }
    setVideoUploaded(video);
    setUrl('')
  }

  const handlePostArticles = async (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
        return;
    }

    const payload = {
        // id: uuidv4(),
        // image: photo,
        // video: url,
        // videoUploaded: videoUploaded,
        // username: firstName + lastName,
        // description: textarea,
        // isImage: photo ? true : false,
        // isVideo: url ? true : false,
        // isVideoUploaded: videoUploaded ? true : false,

        files : [photo, url],
        content : textarea,

    };

    const newArticles = [...reversedArticles, payload];
    // dispatch(setArticles(newArticles));
    const data = JSON.stringify(payload);
    try {
        const response = await axios.post(
          'https://mentora-5s1z.onrender.com/api/post/addpost', 
          data,
          {
            headers: {
                 Authorization: `Bearer ${auth.Token}`,
                'Content-Type': 'application/json',
            },
          }
        );

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        // const data = await response.json();
        console.log('Success : ', response.data);
    } catch (error) {
        console.log('Error post : ', error);
    }

    // dispatch(postArticleToAPI(newArticles));
    rest(e);
};


  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // console.log(selectedOption)
  return (
     ShowPopup &&  
        <>
         <div className='popup-container'>
            <div className="popup-header">
                <span>create a post</span>
                <img src={exit} alt="not found"  onClick={rest}/>
            </div>
            <div className="popup-user-info">
                <img src={defaultimage} alt="not found" />
                <span>{firstName}{lastName}</span>
            </div>
            <textarea placeholder='what do you want  to talk about ?' className='textarea'value={textarea} autoFocus={true} onChange={(e)=>{setTextarea(e.target.value)}}/>
            {type==="photo"?
            <>
             <input  id="inputfile" type='file' className='inputfile'  onChange={handleImage}/>
             <label htmlFor='inputfile' className='labelphoto'>
               <span>select  an image to share</span>
               <img src={upload} alt="not found" />
             </label>
             {photo?<img src={URL.createObjectURL(photo)} className='photoshared' alt='not found'/>:''}
            </>
            :
            type==="video"?
            <>
             <div className="twoOptions">
                 <label>
                   <input type="radio" value="Link" checked={selectedOption === 'Link'} onChange={handleOptionChange} />
                   <p>Link</p> 
                 </label>
                 
                 <label>
                     <input type="radio"  value="Upload Video" checked={selectedOption === 'Upload Video'} onChange={handleOptionChange}/>
                     <p>Upload Video</p>
                 </label>
              </div>

              {selectedOption === 'Link'? 
                <>
                 <div className="urlinput">
                  <input  id="inputurl" type='text' className='inputurl' placeholder='plz input a video link' value={url} onChange={(e)=>{setUrl(e.target.value);setVideoUploaded('');}}/>
                 <img src={urlIcon} alt="not found" />
                </div>
                {url? <ReactPlayer width="100%" height="200px" url={url}/>:""}
                </>
                : 
                selectedOption === 'Upload Video'?
                <>
                  <input  id="inputfilevideo" type='file' className='inputfile'  onChange={handleVideo}/>
                   <label htmlFor='inputfilevideo' className='labelphoto'>
                       <span>select  a video to share</span>
                       <img src={upload} alt="not found" />
                   </label>
                  {videoUploaded?
                   <video controls style={{ width: '100%', height: '200px' }}>
                     <source src={URL.createObjectURL(videoUploaded)} type={videoUploaded.type} />
                  </video>
                  :''}
               </>
                 :''}
             

             
            </>
            :
            ""}
            <div className="popup-footer">
                <div className="icons">
                    <img src={photoIcon} alt="not found" onClick={() => { handlePopupType('photo'); setUrl(''); }}  />
                    <img src={videoIcon} alt="not found" onClick={() => {handlePopupType('video'); setPhoto('');}} />
                </div>
                <button disabled={!textarea?true:false} className={textarea.length!==0?"":"disabled"} onClick={(e)=>{handlePostArticles(e)}}>post</button>
            </div>
         </div>
        </>
  )
}

export default Popup; 
