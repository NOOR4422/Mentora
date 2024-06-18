import React, { useState, useRef, useEffect } from "react";
import { Picker } from "emoji-mart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faTrash,
  faPaperclip,
  faSmile,
  faCheck,
  faPaperPlane,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import "./ChatTopbar.css";
import io from "socket.io-client";
import Cookies from "universal-cookie";

const ChatTopbar = ({
  personName = "Nour Shazly",
  personPic = "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
}) => {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [isEmotionsOpen, setIsEmotionsOpen] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const popupMenuRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const cookies = new Cookies();
  const token = cookies.get("Bearer");
  console.log(token);

  const handleOptionsClick = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };

  const handleDeleteOptionClick = () => {
    setIsOptionsMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/chat/deleteMessage",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Resource deleted successfully!");
      } else {
        console.log("Error deleting the resource");
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/chat/messages",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const messages = await response.json();
          setMessages(messages);
        } else {
          throw new Error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

const handleSendClick = async () => {
  if (inputValue.trim() !== "" || filePreview) {
    const formData = new FormData();
    formData.append("files", filePreview); // assuming filePreview is a base64 string
    formData.append("receiveId", "65bbec61e555870dd0a4837d"); // replace with dynamic value
    formData.append("message", inputValue);

    try {
      const response = await fetch("http://localhost:4000/api/chat/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Message Sent:", result);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: result.messageId,
            text: inputValue,
            filePreview: filePreview,
            sent: true,
            time: getCurrentTime(),
            seen: false, //
          },
        ]);

        setInputValue("");
        setFilePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
};

const handleSendEdit = async () => {
  try {
    const selectedMessage = messages.find(
      (message) => message.id === selectedMessageId
    );

    if (!selectedMessage) {
      console.error("Selected message not found");
      return;
    }

    const response = await fetch(
      `http://localhost:4000/api/chat/editMessage/66549c325b252127e2dbcaf4${selectedMessage.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputValue,
          filePreview,
        }),
      }
    );

    if (response.ok) {
      const updatedMessage = await response.json();
      const updatedMessages = messages.map((message) =>
        message.id === selectedMessageId ? updatedMessage : message
      );

      setMessages(updatedMessages);
      setInputValue("");
      setFilePreview(null);
      setSelectedMessageId(null);
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    } else {
      throw new Error("Failed to edit message");
    }
  } catch (error) {
    console.error("Error editing message:", error);
  }
};



  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc);
    setIsExpanded(true);
  };

  const handleCloseClick = () => {
    setIsExpanded(false);
    setExpandedImage(null);
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setIsAttachmentOpen(false);
    setIsEmotionsOpen(false);
  };

  

  const handleStatusClick = () => {};

  const handleEmotionClick = (emoji) => {
    setInputValue((prevValue) => prevValue + emoji);
  };

  const handlePopupMenuOpen = (messageId, event) => {
    event.preventDefault();
    setSelectedMessageId(messageId);
    setIsPopupMenuOpen(true);
  };

  const handlePopupMenuClose = () => {
    setSelectedMessageId(null);
    setIsPopupMenuOpen(false);
  };

  const handleEditClick = () => {
    const selectedMessage = messages.find(
      (message) => message.id === selectedMessageId
    );
    if (selectedMessage) {
      setInputValue(selectedMessage.text);
      setFilePreview(selectedMessage.filePreview || null);
      setIsPopupMenuOpen(false);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/chat/deleteMessage/${selectedMessageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedMessages = messages.filter(
          (message) => message.id !== selectedMessageId
        );
        setMessages(updatedMessages);
        setSelectedMessageId(null);
        setIsPopupMenuOpen(false);
        console.log("Message deleted successfully!");
      } else {
        throw new Error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // const handleSendEdit = async () => {
  //   try {
  //     const selectedMessage = messages.find(
  //       (message) => message.id === selectedMessageId
  //     );

  //     if (!selectedMessage) {
  //       console.error("Selected message not found");
  //       return;
  //     }

  //     const response = await fetch(
  //       `http://localhost:4000/api/chat/editMessage/${selectedMessage.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           text: inputValue,
  //           filePreview,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       const updatedMessage = await response.json();
  //       const updatedMessages = messages.map((message) =>
  //         message.id === selectedMessageId ? updatedMessage : message
  //       );

  //       setMessages(updatedMessages);
  //       setInputValue("");
  //       setFilePreview(null);
  //       setSelectedMessageId(null);
  //       localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
  //     } else {
  //       throw new Error("Failed to edit message");
  //     }
  //   } catch (error) {
  //     console.error("Error editing message:", error);
  //   }
  // };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  return (
    <div className="right-section">
      <div className="top-bar">
        <img src={personPic} alt="Person Pic" className="person-pic" />
        <div className="person-details">
          <h3 className="personName">{personName}</h3>
        </div>
        <div className="options-chat">
          <FontAwesomeIcon icon={faEllipsisV} onClick={handleOptionsClick} />
          {isOptionsMenuOpen && (
            <div className="options-menu">
              <div onClick={handleDeleteOptionClick}>
                <div>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                <div>Delete</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chat-page-body">
        <div className="right-section">
          <div className="chat-body">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sent ? "sent" : "received"}`}
                onContextMenu={(event) =>
                  handlePopupMenuOpen(message.id, event)
                }
              >
                <div className="message-info"></div>
                <div className="message-content">
                  {isPopupMenuOpen && selectedMessageId === message.id && (
                    <div className="popup-menu" ref={popupMenuRef}>
                      <div onClick={handleEditClick}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </div>
                      <div onClick={handleDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </div>
                    </div>
                  )}
                  {message.filePreview && (
                    <div className="file-preview">
                      {message.filePreview.startsWith("data:image") && (
                        <img src={message.filePreview} alt="File Preview" />
                      )}
                      {message.filePreview.startsWith(
                        "data:application/pdf"
                      ) && (
                        <embed
                          src={message.filePreview}
                          type="application/pdf"
                        />
                      )}
                    </div>
                  )}
                  <p className="text">{message.text}</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="time">{message.time}</p>
                    <div className="status-icons">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={message.seen ? "seen" : "not-seen"}
                        onClick={handleStatusClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed-input-field">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
              ref={(input) => input && selectedMessageId && input.focus()}
            />
            <FontAwesomeIcon
              icon={faPaperclip}
              className="attachment-icon"
              onClick={handleAttachmentClick}
            />
            <FontAwesomeIcon
              icon={faSmile}
              className="emotion-icon"
              onClick={() => setIsEmotionsOpen(!isEmotionsOpen)}
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              className={`send-icon ${
                inputValue.trim() !== "" || filePreview ? "active" : ""
              }`}
              onClick={selectedMessageId ? handleSendEdit : handleSendClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          {isEmotionsOpen && (
            <div className="emoji-picker-container">
              <Picker onSelect={(emoji) => handleEmotionClick(emoji.native)} />
            </div>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <p>Are you sure you want to delete this chat?</p>
            <div className="delete-modal-buttons">
              <button onClick={handleDeleteConfirm}>OK</button>
              <button onClick={handleDeleteCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatTopbar;
