import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { connect,useDispatch,useSelector } from "react-redux";
import "./Home.css";
import { setArticles } from "../../redux/Articles/articlesActions";
import Sidebar from "../Sidebar/Sidebar";
import PublishBox from "../PublishPost/PublishBox";
import noposts from "../../assets/noPostsYet.png";
import Popup  from "../Popup/Popup";
import {postUserDataSuccess} from "../../redux/Register/registerActions"
import RightSection from "../Rightside/RightSection";
import Post from "../Post/Post";
import axios from "axios";
import { User } from "../Context/userContext";

const Home = () => {
  const { auth } = useContext(User);
  const [ShowPopup,setShowPopup] = useState(false);
  const [PopupType,setPopupType] = useState(null);
  const dispatch = useDispatch();
  const articles = useSelector(state => state.articles.articles);
  const [overlay, setOverlay] = useState(false);
  const handleShowPopup=() =>{
    setShowPopup(!ShowPopup);
  }

  

  const handlePopupType = (type) => {
    setPopupType(type);
  };

   const handleOverlay =(value)=>{
    setOverlay(value);
   }

   useEffect(() => {
    console.log("Hellooo");
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://mentora-5s1z.onrender.com/api/post/", {
          headers: {
            Authorization: `Bearer ${auth.Token}`,
            'Content-Type': 'application/json',
          }
        });
        // setArticles(response.data);
        dispatch(setArticles(response.data));
        
        console.log("success : ",response.data);
      } catch (error) {
        console.log("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [auth.Token]);

  return (
    <>
    <div className="home-container">
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

