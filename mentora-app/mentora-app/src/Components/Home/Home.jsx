import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { connect,useSelector } from "react-redux";
import "./Home.css";
import Sidebar from "../Sidebar/Sidebar";
import PublishBox from "../PublishPost/PublishBox";
import noposts from "../../assets/noPostsYet.png";
import Popup  from "../Popup/Popup";
import {postUserDataSuccess} from "../../redux/Register/registerActions"
import RightSection from "../Rightside/RightSection";
import Post from "../Post/Post";
const Home = () => {
  const [ShowPopup,setShowPopup] = useState(false);
  const [PopupType,setPopupType] = useState(null)
  const handleShowPopup=() =>{
    setShowPopup(!ShowPopup);
  }

  const handlePopupType = (type) => {
    setPopupType(type);
  };
  const articles = useSelector(state => state.articles.articles);
  const [overlay,setOverlay] =useState(false);
   const handleOverlay =(value)=>{
    setOverlay(value);
   }
  return (
    <>
    <div className={`home-container`}>
       <Navbar/>
       <div className="home-content-container">
           <Sidebar/>
           <div className="container-home">
             <div className="home-main-content1">
               <PublishBox  handleShowPopup={handleShowPopup} handlePopupType={handlePopupType} />
               {articles.length=== 0?<img src={noposts} className="nopostsyet" alt="not found"/>:
                 <Post handleOverlay={handleOverlay} />
               }
               <Popup type={PopupType} ShowPopup={ShowPopup} handleShowPopup={handleShowPopup} handlePopupType={handlePopupType} />
             </div> 
             <div className="home-main-content2">
               <RightSection/>
            </div>
           </div>
           {ShowPopup && <div className="overlay"></div>}
           {overlay && <div className="overlay"></div>}
        </div>
    </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  articles:state.articles.articles,
});

const mapDispatchToProps = (dispatch) => ({
  postUserDataSuccess: () => dispatch(postUserDataSuccess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

