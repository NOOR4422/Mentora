import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./CommunityPageBody.css";
import { useDispatch,useSelector } from "react-redux";
// import { addQuestion ,addAnswer} from "../../../redux/Community/communityActions";
import download from "../../../assets/download.png"
import avatar from"../../../assets/Default_avatar.png"
import menu from "../../../assets/menuQuestion.png"
import answer from "../../../assets/answer.png"
const CommunityPageBody = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.community.questions);
  const [inputValue, setInputValue] = useState("");
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [replyInput, setReplyInput] = useState("");
  const [replies, setReplies] = useState([]);
  const replyInputRef = useRef(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const popupMenuRef = useRef(null);
 
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupMenuRef.current &&
        !popupMenuRef.current.contains(event.target)
      ) {
        handlePopupMenuClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // const handleSendClick = () => {
  //   if (inputValue.trim() !== "" || filePreview) {
  //     const newQuestion = {
  //       text: inputValue,
  //       filePreview,
  //     };
  //     dispatch(addQuestion(newQuestion));
  //     setInputValue("");
  //     setFilePreview(null);
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = null;
  //     }
  //   }
  // };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setIsAttachmentOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const getFileType = (filePreview) => {
    if (filePreview.startsWith('data:image/')) {
      return 'image';
    } else if (filePreview.startsWith('data:application/pdf')) {
      return 'pdf';
    } else {
      return 'other'; 
    }
  };

  const getFilePreview = (filePreview, fileType) => {
    if (fileType === 'image') {
      return <img src={filePreview} alt="File Preview"  style={{width:"70%" ,height:"150px"}}/>;
    } else if (fileType === 'pdf') {
      return <div style={{ width: '70%', overflow: 'hidden',overflowX: 'hidden', overflowY: 'hidden',scrollbarWidth: 'none', position: 'relative' }}>
       <embed src={filePreview} type="application/pdf" width="100%" height="150px"  style={{overflow:"hidden",overflowX: 'hidden', overflowY: 'hidden',scrollbarWidth: 'none',}}/>
       <a href={filePreview} download="file.pdf" style={{ position: 'absolute', top: '10px', right: '8%', zIndex: '999' }}>
        <img src={download} alt="not found" />
       </a>
     </div>
    } else {
      return 
    }
  };
  











  const handleEmotionClick = (emoji) => {
    setInputValue((prevValue) => prevValue + emoji);
  };

  const handleCommentButtonClick = (messageId) => {
    setSelectedMessageId(messageId);
  };

  const handleSendCommentClick = () => {
    if (replyInput.trim() !== "") {
      const newComment = {
        personPic:
          "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
        text: replyInput,
        time: getCurrentTime(),
      };

      setReplies([...replies, newComment]);
      setReplyInput("");

    }
  };

  

  // const handleSendReplyClick = () => {
  //   if (replyInput.trim() !== "") {
  //     const newReply = {
  //       personPic:
  //         "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  //       text: replyInput,
  //       time: getCurrentTime(),
  //     };

  //     setReplies([...replies, newReply]);
  //     setReplyInput("");
  //     setRepliesVisible(false);
  //   }
  // };

  const handlePopupMenuOpen = (messageId, event) => {
    event.preventDefault(); // Prevent the default context menu
    setSelectedMessageId(messageId);
    setIsPopupMenuOpen(true);
  };

  const handlePopupMenuClose = () => {
    setSelectedMessageId(null);
    setIsPopupMenuOpen(false);
  };

  

 
  const handleSendEdit = () => {
    const selectedMessage = messages.find(
      (message) => message.id === selectedMessageId
    );
    if (selectedMessage) {
      const updatedMessages = messages.map((message) =>
        message.id === selectedMessageId
          ? {
              ...message,
              text: inputValue,
              filePreview,
            }
          : message
      );

      setMessages(updatedMessages);
      setInputValue("");
      setFilePreview(null);
      setSelectedMessageId(null);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const [showAnswerMap, setShowAnswerMap] = useState({}); 
  const handleToggleAnswer = (questionIndex) => {
    setShowAnswerMap((prevMap) => ({
      ...prevMap,
      [questionIndex]: !prevMap[questionIndex], 
    }));
  };

  // const handleSendAnswerClick = (questionIndex) => {
  //   if (replyInput.trim() !== "") {
  //     dispatch(addAnswer(questionIndex, replyInput));
  //     setReplyInput("");
  //   }
  // };
  return (
    <div className="community-page-body">
      <div className="community-body">
        {questions.map((question, index) => (
          <div key={index} className="question">
            <div className="question-header">
              <div className="info">
                <img src={avatar} alt="not found" />
                <p>username</p>
              </div>
              <img src={menu} alt="not found" />
            </div>
            <p>{question.text}</p>
            <div className="question-file">
              {question.filePreview && getFilePreview(question.filePreview, getFileType(question.filePreview))}
            </div>
            <div className="noOfReplys">
               <p>10 Reply</p>
            </div>
            <div className="answer" onClick={() => handleToggleAnswer(index)}>
              <img src={answer} alt="not found" />
              {showAnswerMap[index] ? <p>hide all answers</p> : <p>leave an answer</p>}
            </div>

            {showAnswerMap[index] &&
              <div className="addAnswer">
                 <input type="text" placeholder="Write your Question..." value={replyInput} onChange={(e) => setReplyInput(e.target.value)} />
                   <FontAwesomeIcon icon={faPaperclip}  className="answer-attachmentan-icon" onClick={handleAttachmentClick}/>      
                   {/* <FontAwesomeIcon icon={faPaperPlane} className={`answer-send-icon ${ inputValue.trim() !== "" || filePreview ? "active" : "" }`}  onClick={() => handleSendAnswerClick(index)} /> */}
                 <input type="file" ref={fileInputRef} style={{ display: "none" }} onClick={handleAttachmentClick} />
              </div>
             }
          </div>
        ))}
      </div>
      <div className="community-fixed-input-field">
        <input type="text" placeholder="Write your Question..."  value={inputValue}  onChange={handleInputChange} />
         <FontAwesomeIcon
          icon={faPaperclip}
          className="community-attachment-icon"
          onClick={handleAttachmentClick}
        />      
        <FontAwesomeIcon
          icon={faPaperPlane}
          className={`community-send-icon ${ inputValue.trim() !== "" || filePreview ? "active" : "" }`}
          // onClick={selectedMessageId ? handleSendEdit : handleSendClick}
        />
        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
      </div>
      
    </div>
  );
};


export default CommunityPageBody;