import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import "./ChatPage.css";
import ChatTopbar from "./ChatTopbar";

const ChatPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatsData, setChatsData] = useState([]);

  const cookies = new Cookies();
  const token = cookies.get("Bearer");
  console.log("Token:", token);

  useEffect(() => {
    const fetchChatsData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/chat/getChats",
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
        console.log("Fetched data:", result);

        if (Array.isArray(result.data)) {
          setChatsData(result.data);
          console.log("Data fetched successfully", result.data);
        } else {
          console.error("Fetched data is not an array:", result.data);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatsData();
  }, [token]);

  const handleChatClick = (chatId) => {
    setSelectedChat(chatId === selectedChat ? null : chatId);
  };

  const filteredChats = chatsData.filter((chat) => {
    return (
      (chat.last_message?.message
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        chat.user?.some((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )) ??
      false
    );
  });

  return (
    <div className="all-chat-container">
      <div className="chat-Container">
        <div className="chats-sidebar">
          <div className="fixed-div">
            <div className="header">
              <h2>Chats</h2>
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
          </div>
          <div className="chats-list">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <div
                  key={chat._id}
                  className={`chat-item ${
                    selectedChat === chat._id ? "selected" : ""
                  }`}
                  onClick={() => handleChatClick(chat._id)}
                >
                  <div className="info">
                    <div>
                      <span>
                        <h3>
                          {chat.user?.map((user, index) => (
                            <span key={user._id}>
                              {user.firstName} {user.lastName}
                              {index < (chat.user?.length ?? 0) - 1 && ", "}
                            </span>
                          ))}
                        </h3>
                      </span>
                      <span>
                        <p>
                          {chat.last_message &&
                            new Date(
                              chat.last_message.createdAt
                            ).toLocaleString()}
                        </p>
                      </span>
                    </div>
                    <span className="last-message">
                      <span className="last-message-text">
                        {chat.last_message?.message}
                      </span>
                      <span>
                        {chat.last_message?.isRead && (
                          <FontAwesomeIcon icon={faCheck} />
                        )}
                      </span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No chats found.</p>
            )}
          </div>
        </div>
        <div className="chat-page-container">
          <div className="chat-page">
            <ChatTopbar selectedChat={selectedChat} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
