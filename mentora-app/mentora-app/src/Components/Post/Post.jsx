import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { updateLoveCount ,addComment,updateCommentCount,deleteArticle,postArticleToAPI} from '../../redux/Articles/articlesActions';
import avatar from "../../assets/Default_avatar.png";
import menu from "../../assets/meuePost.png";
import like from "../../assets/like.png";
import likeIcon from "../../assets/likeFooter.png";
import comment from "../../assets/comment.png";
import save from "../../assets/save.png";
import send from "../../assets/send.png";
import "./Post.css";
import ReactPlayer from 'react-player';
import edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
import loveSound from "../../assets/like.mp4"
import likeActiveIcon from "../../assets/likeActive.png";
import add from "../../assets/addComment.png"
import PopupEdit from '../PopupEditing/PopupEdit';
import exitWhite from "../../assets/exitWhite.png";
import noCommentsYet from "../../assets/noCommetsYet.png"
import likeComment from "../../assets/likeComment.png"
import reply from "../../assets/replyComment.png";
import { v4 as uuidv4 } from 'uuid';
const Post = ({handleOverlay}) => {
  const [showeMenuOption,setShowMeneOption]= useState(false);
  const handelShoweMenuOption = (postId) => {
    setShowMeneOption((prevShowMeneOption) => postId === prevShowMeneOption ? false : postId);
  };
  
  const userData = useSelector(state => state.register.userData);
  const {firstName ,lastName} =userData;
  const articles = useSelector(state => state.articles.articles);
  const dispatch = useDispatch();
  const reversedArticles = [...articles].reverse();

  const [playSound, setPlaySound] = useState(false);
  const [likeCount,setLikeCount] =useState(0);
  const [likeActive,setLikeActive] =useState(false);
  const handleLoveClick = (article) => {
    setPlaySound(true); 
    setLikeActive(!likeActive);
    const updatedLikeCount = likeActive ? likeCount - 1 : likeCount + 1;
    setLikeCount(updatedLikeCount);
    dispatch(updateLoveCount(article.id, updatedLikeCount));
  }
  if (playSound) {
    const audio = new Audio(loveSound);
    audio.play();
    setPlaySound(false); 
  }
  const [showCommentsMap, setShowCommentsMap] = useState({});
  const handleshowComments = (postId, show = true) => {
    setShowCommentsMap(prevState => ({
      ...prevState,
      [postId]: show
    }));
    handleOverlay(true);
  };
  

  const handleDeleteArticle = (articleId) => {
    dispatch(deleteArticle(articleId));
    const updatedArticles = articles.filter(article => article.id !== articleId);
    dispatch(postArticleToAPI(updatedArticles));
  };
  

  const [description,setdescription]= useState('')

  const handelPostComment = (article) => {
    reversedArticles.forEach((article) => {
      if (showCommentsMap[article.id]) {
        const payload = {
          id: uuidv4(),
          commentDescription: description,
          userCommented: firstName + lastName,
        };
        dispatch(addComment(article.id, payload));
        const updatedCommentCount = (article.commentCount || 0) + 1; 
        dispatch(updateCommentCount(article.id, updatedCommentCount));
      }
    });
    setdescription('');
  };


  const [PopupType,setPopupType] = useState(null)
  const handlePopupType = (type) => {
    setPopupType(type);
  };


  const [showEditPopup, setShowEditPopup] = useState(false); 
  const [selectedArticle, setSelectedArticle] = useState(null);
  const handleEditArticle = (article) => {
    setSelectedArticle(article); 
    handleOverlay(true)
    setShowEditPopup(true); 
    setShowMeneOption();
  };

  
  return (
    <>
      {reversedArticles.map((article) => (
        <>
        <div className='post' key={article.id}>
          <div className="post-header">
            <div className="user-info">
              <img src={avatar} alt="not found" />
              <div className="user-details">
                <h3>{article.username}</h3>
                <p>time</p>
              </div>
            </div>
            <img src={menu} alt="not found" className='menu' onClick={()=>{handelShoweMenuOption(article.id)}}/>
            {showeMenuOption === article.id&&
             <div className="options">
               <div className="edit" onClick={() => handleEditArticle(article)}>
                 <img src={edit} alt="not found" />
                 <span>edit</span>
               </div>
               <div className="delete"  onClick={() => handleDeleteArticle(article.id)}>
                 <img src={Delete} alt="not found" />
                 <span>delete</span>
               </div>
             </div>
            }
          </div>
          <p className="description">{article.description}</p>
          {article.isImage && <img src={URL.createObjectURL(article.image)} alt="not found" className='Shared'/>}
          {article.isVideo && <ReactPlayer width="100%" height="200px" url={article.video} />}
          {article.isVideoUploaded&&
              <video controls style={{ width: '100%', height: '200px' }}>
                 <source src={URL.createObjectURL(article.videoUploaded)} type={article.videoUploaded.type} />
              </video>}
          <div className="noOfReactsComments">
            <div className="noOfReacts">
              <img src={like} alt="not found" />
              <p>{article.loveCount}</p>
            </div>
            <div className="noOfComments">
              <p>{article.commentCount} comments</p>
            </div>
          </div>

          <div className="post-footer">
            <div className="item" onClick={() => handleLoveClick(article)}>
              {article.loveCount>0?<img src={likeActiveIcon} alt='not found'/> : <img src={likeIcon} alt="not found" />}
              <p>like</p>
            </div>
            <div className="item"  onClick={() => handleshowComments(article.id)}>
              <img src={comment} alt="not found" />
              <p>comment</p>
            </div>
            <div className="item">
              <img src={save} alt="not found" />
              <p>save</p>
            </div>
            <div className="item">
              <img src={send} alt="not found" />
              <p>send</p>
            </div>
          </div>
        </div>

        {showCommentsMap[article.id]&&
        
         <div className="container-comments">
           <div className="header-comment">
            <img src={exitWhite} alt="not found"  onClick={() =>{ handleshowComments(article.id, false); handleOverlay(false);}}/>
           </div>
           <div className="post-comment">
             <img src={avatar} alt="not found" className='avatar'/>
             <div className="input-comment">
              <input type="text" autoFocus placeholder='leave a comment' value={description} onChange={(e)=>setdescription(e.target.value)}/>
              <div className="button"  onClick={()=>handelPostComment(article)}>
                <button  className={description.length!==0?'addpcomment':"disabled"} disabled={!description?true:false} >add</button>
                <img src={add} alt='not found'/>
              </div>
             </div>
          </div>
           {article.commentCount>0?
             (article.comments.slice().reverse().map((comment,index) => (
              (comment.commentDescription?
                <div key={comment.id} className="comment" >
                 <img src={avatar} alt="not found" className='avatar'/>
                 
                   <div className="comment-details">
                      <div className="all-above">
                        <div className="above">
                          <p className="comment-user">{comment.userCommented}</p>
                          <span>time</span>
                        </div>
                        <img src={menu} alt="not found" />
                      </div>
                       <p className="comment-description">{comment.commentDescription}</p>
                       <div className="Actions">
                          <div className="likeComment">
                            <img src={likeComment} alt="not found" />
                            <p>2 likes</p>
                          </div>
                          <div className="replyComment">
                            <img src={reply} alt="not found" />
                            <p>2 reply</p>
                          </div>
                      </div>
                   </div>
              </div>
               : '')
              
           )))
           : 
            <div className="noComments">
              <img src={noCommentsYet} alt="not found" />
            </div>
           }
         </div>
        
        }
        </>
      ))}
       <PopupEdit
        type={PopupType}
        ShowPopup={showEditPopup}
        handleShowPopup={() => setShowEditPopup(false)}
        editArticleData={selectedArticle} 
        handlePopupType={handlePopupType}
        handleOverlay={handleOverlay} 
      />
    </>
  );
}

export default Post;
