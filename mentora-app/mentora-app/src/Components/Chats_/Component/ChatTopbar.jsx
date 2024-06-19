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
  const [sent, setSent] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const popupMenuRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const cookies = new Cookies();
  const token = cookies.get("Bearer");
  const currentUserId = "666f3fd821dbcbbce379a81e"; // Assuming this is the current user's ID, replace with dynamic value if necessary
  const selectedChatId = "666f402f21dbcbbce379a82c"; // Assuming this is the current chat ID, replace with dynamic value if necessary

  useEffect(() => {
    const fetchMessagesData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/chat/findChat/${selectedChatId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const result = await response.json();
        setMessages(result.data.messages);
        setSent(true);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchMessagesData();
  }, [token, selectedChatId]);

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

  const handleSendClick = async () => {
    if (inputValue.trim() !== "" || filePreview) {
      const formData = new FormData();
      formData.append("files", filePreview); // assuming filePreview is a base64 string
      formData.append("message", inputValue);
      formData.append("senderID", currentUserId); // Set the sender ID
      formData.append("chatID", selectedChatId); // Set the chat ID
      formData.append("receiveId", "6654c90f5beffbb507f7be47"); // replace with dynamic value

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

          // Update the messages state with the new message
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: result.id,
              message: inputValue,
              files: filePreview
                ? [{ filePath: filePreview, fileType: "image/jpeg" }]
                : [],
              senderID: currentUserId,
              createdAt: new Date(),
              isRead: false,
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



  const fetchChatData = async (selectedChatId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/chat/findChat/${selectedChatId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      setMessages(result.data.messages);
      setSent(true);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };







 const handleEditClick = () => {
   const selectedMessage = messages.find(
     (message) => message._id === selectedMessageId
   );
   if (selectedMessage) {
     setInputValue(selectedMessage.message);
     setFilePreview(selectedMessage.files[0]?.filePath || null);
     setIsPopupMenuOpen(false);
   }
 };

 const handleDeleteClick = async () => {
   if (!selectedMessageId) return;

   try {
     const response = await fetch(
       `http://localhost:4000/api/chat/deleteMessage/${selectedMessageId}`,
       {
         method: "DELETE",
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       }
     );

     if (response.ok) {
       const updatedMessages = messages.filter(
         (message) => message._id !== selectedMessageId
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

  const handleSendEdit = async () => {
    if (!selectedMessageId) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/chat/editMessage/${selectedMessageId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputValue }),
        }
      );

      if (response.ok) {
        const updatedMessages = messages.map((message) =>
          message._id === selectedMessageId
            ? { ...message, message: inputValue }
            : message
        );
        setMessages(updatedMessages);
        setSelectedMessageId(null);
        setInputValue("");
        setFilePreview(null);
        setIsPopupMenuOpen(false);
        console.log("Message updated successfully!");
      } else {
        const errorText = await response.text();
        console.error("Failed to update message:", errorText);
        throw new Error("Failed to update message");
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
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
                className={`message ${
                  message.senderID === "666f3fd821dbcbbce379a81e"
                    ? "sent"
                    : "received"
                }`}
                onContextMenu={(event) =>
                  handlePopupMenuOpen(message._id, event)
                }
              >
                <div className="message-info">
                 
                </div>
                <div className="message-content">
                  {isPopupMenuOpen && selectedMessageId === message._id && (
                    <div className="popup-menu" ref={popupMenuRef}>
                      <div onClick={handleEditClick}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </div>
                      <div onClick={handleDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </div>
                    </div>
                  )}
                  {message.files && message.files.length > 0 && (
                    <div className="file-preview">
                      {message.files.map((file, fileIndex) => (
                        <div key={fileIndex}>
                          {file.fileType.startsWith("image/") ? (
                            <img
                              src={`http://localhost:4000/${file.filePath}`}
                              alt="File Preview"
                            />
                          ) : (
                            <embed
                              src={`http://localhost:4000/${file.filePath}`}
                              type={file.fileType}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text">{message.message}</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="time">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                    <div className="status-icons">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={message.isRead ? "seen" : "not-seen"}
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
