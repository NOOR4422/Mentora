import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLoveCount, addComment, updateCommentCount, deleteArticle, postArticleToAPI } from '../../redux/Articles/articlesActions';
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
import axios from 'axios';
import { User } from "../Context/userContext";
import PopupCommint from '../PopupEditing/PopupCommint';
import AddReply from '../PopupEditing/addReply';
const Post = ({ handleOverlay }) => {
  const { auth } = useContext(User);
  const [showeMenuOption, setShowMeneOption] = useState(false);
  const handelShoweMenuOption = (postId) => {
    setShowMeneOption((prevShowMeneOption) => postId === prevShowMeneOption ? false : postId);
  };

  const userData = useSelector(state => state.register.userData);
  const { firstName, lastName } = userData;

  const articles = useSelector(state => state.articles.articles);
  const [datetimeStr, setDatetimeStr] = useState('');
  const [comments, setComments] = useState([]);
  const [postID, setPostID] = useState('');
  const [dateStr, setDateStr] = useState('2024-06-20');
  const [timeStr, setTimeStr] = useState('02:17');
  const dispatch = useDispatch();
  const reversedArticles = [...articles].reverse();

  const [playSound, setPlaySound] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
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
  const handleshowComments = async (postId, show = true) => {
    setPostID(postId);
    setShowCommentsMap(prevState => ({
      ...prevState,
      [postId]: show
    }));
    handleOverlay(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/post/${postId}/getPostComments`, {
        headers: {
          Authorization: `Bearer ${auth.Token}`,
          "Content-Type": "application/json"
        }
      });
      console.log(response.data.comments);
      setComments(response.data.comments)
    } catch (error) {
      console.log(error.message);

    }
  };


  const handleDeleteArticle = (articleId) => {
    dispatch(deleteArticle(articleId));
    const updatedArticles = articles.filter(article => article.id !== articleId);
    dispatch(postArticleToAPI(updatedArticles));
  };


  const [description, setdescription] = useState('')

  const handelPostComment = async (article) => {
    console.log(article._id);
    console.log(description);
    console.log(auth.Token);
    try {
      const response = await axios.post(`http://localhost:4000/api/post/${article._id}/addComment`, { content: description }, {
        headers: {
          Authorization: `Bearer ${auth.Token}`,
          "Content-Type": "application/json"
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);

    }
  };

  const [PopupType, setPopupType] = useState(null)
  const handlePopupType = (type) => {
    setPopupType(type);
  };


  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showEditCommint, setShowEditCommint] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedcommint, setSelectedCommint] = useState(null);
  const handleEditArticle = (article) => {
    setSelectedArticle(article);
    handleOverlay(true)
    setShowEditPopup(true);
    setShowMeneOption();
  };
  const handleEditCommint = (commint) => {
    setSelectedCommint(commint);
    setShowEditCommint(true);
    setShowMeneOption();
  };
  useEffect(() => {
    if (articles.date) {
      let dateValue = '2024-06-20T12:02:17.619Z';
      if (typeof dateValue !== 'string') {
        dateValue = dateValue.toString();
      }


      const parsedDate = new Date(dateValue);
      if (!isNaN(parsedDate)) {
        setDatetimeStr(dateValue);
      } else {
        console.log('Invalid date format:', dateValue);
      }
    }
  }, []);

  useEffect(() => {
    if (datetimeStr) {
      const parsedDate = new Date(datetimeStr);
      if (!isNaN(parsedDate)) {
        setDateStr(parsedDate.toISOString().split('T')[0]);
        setTimeStr(parsedDate.toTimeString().split(' ')[0]);
      }
      else {
        console.log('Invalid date');
      }
    }
    console.log("date is ", dateStr);
    console.log("time is ", timeStr);
  }, [comments]);
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/post/${postID}/${commentId}/deleteComment`, {
        headers: {
          Authorization: `Bearer ${auth.Token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        console.log('Comment deleted successfully');
        // Optionally, update your state here
      }
    } catch (error) {
      console.error('Error deleting the comment:', error);
    }
  };
  const [showReply, setShowReply] = useState(false);
  const handleShowReply = (commentId) => {
    setShowReply(true);
    setSelectedCommint(commentId)
  }
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  const formattedComments = comments.map(comment => ({
    ...comment,
    date: formatDate(comment.date)
  }));
  console.log(formattedComments);
  console.log(comments);
  
  return (
    <>
      {reversedArticles.map((article, index) => (
        <>
          <div className='post' key={index}>
            <div className="post-header">
              <div className="user-info">
                <img src={avatar} alt="not found" />
                <div className="user-details">
                  <h3>{article.author.firstName} {article.author.lastName}</h3>
                  <p>{dateStr} {timeStr}</p>
                </div>
              </div>
              <img src={menu} alt="not found" className='menu' onClick={() => { handelShoweMenuOption(article._id) }} />
              {showeMenuOption === article._id &&
                <div className="options">
                  <div className="edit" onClick={() => handleEditArticle(article)}>
                    <img src={edit} alt="not found" />
                    <span>edit</span>
                  </div>
                  <div className="delete" onClick={() => handleDeleteArticle(article._id)}>
                    <img src={Delete} alt="not found" />
                    <span>delete</span>
                  </div>
                </div>
              }
            </div>
            <p className="description">{article.content}</p>
            {article.isImage && <img src={URL.createObjectURL(article.image)} alt="not found" className='Shared' />}
            {article.isVideo && <ReactPlayer width="100%" height="200px" url={article.video} />}
            {article.isVideoUploaded &&
              <video controls style={{ width: '100%', height: '200px' }}>
                <source src={URL.createObjectURL(article.videoUploaded)} type={article.videoUploaded.type} />
              </video>}
            <div className="noOfReactsComments">
              <div className="noOfReacts">
                <img src={like} alt="not found" />
                <p>{article.reactsCount}</p>
              </div>
              <div className="noOfComments">
                <p>{article.commentsCount} comments</p>
              </div>

            </div>

            <div className="post-footer">
              <div className="item" onClick={() => handleLoveClick(article)}>
                {article.loveCount > 0 ? <img src={likeActiveIcon} alt='not found' /> : <img src={likeIcon} alt="not found" />}
                <p>like</p>
              </div>
              <div className="item" onClick={() => handleshowComments(article._id)}>
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

          {showCommentsMap[article._id] &&

            <div className="container-comments">
              <div className="header-comment">
                <img src={exitWhite} alt="not found" onClick={() => { handleshowComments(article._id, false); handleOverlay(false); }} />
              </div>
              <div className="post-comment">
                <img src={avatar} alt="not found" className='avatar' />
                <div className="input-comment">
                  <input type="text" autoFocus placeholder='leave a comment' value={description} onChange={(e) => setdescription(e.target.value)} />
                  <div className="button" onClick={() => handelPostComment(article)}>
                    <button >add</button>
                    <img src={add} alt='not found' />
                  </div>
                </div>
              </div>
              {formattedComments.length > 0 ?
                (formattedComments.map((comment, index) => (
                  <div key={index} className="comment" >
                    <img src={avatar} alt="not found" className='avatar' />
                    <div className="comment-details">
                      <div className="all-above">
                        <div className="above">
                          <p className="comment-user">{comment.authorName}</p>
                          <span>{comment.date}</span>
                        </div>
                        <img src={menu} alt="not found" className='menu' onClick={() => { handelShoweMenuOption(comment.id) }} />
                        {showeMenuOption === comment.id &&
                          <div className="options options-2">
                            <div className="edit" onClick={() => handleEditCommint(comment)}>
                              <img src={edit} alt="not found" />
                              <span style={{ color: "#fff", padding: "0rem 1rem" }}>edit</span>
                            </div>
                            <div className="delete" style={{ color: "#fff" }} onClick={() => handleDeleteComment(comment.id)}>
                              <img src={Delete} alt="not found" />
                              <span style={{ color: "#fff", padding: "0rem 1rem" }}>delete</span>
                            </div>
                          </div>
                        }
                      </div>
                      <p className="comment-description">{comment.content}</p>
                      <div className="Actions">
                        <div className="likeComment">
                          <img src={likeComment} alt="not found" />
                          <p>{comment.reactsCount} likes</p>
                        </div>
                        <div className="replyComment" onClick={() => handleShowReply(comment.id)}>
                          <img src={reply} alt="not found" />
                          <p>{comment.repliesCount} reply</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
        // editCommintData={selectedcommint}
        handlePopupType={handlePopupType}
        handleOverlay={handleOverlay}
      />
      <PopupCommint
        ShowPopup={showEditCommint}
        showEditCommint={() => setShowEditCommint(false)}
        editCommintData={selectedcommint}
        handlePopupType={handlePopupType}
        idPost={postID}
      />
      <AddReply
        ShowPopup={showReply}
        showEditCommint={() => setShowReply(false)}
        editCommintData={selectedcommint}
        handlePopupType={handlePopupType}
        idPost={postID}
      />
    </>
  );
}

export default Post;
