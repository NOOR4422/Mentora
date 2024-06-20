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
  const [chatDetails, setChatDetails] = useState(null);
  const [userName, setUserName] = useState([]);

  const cookies = new Cookies();
  const token = cookies.get("Bearer");

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

        if (Array.isArray(result.data)) {
          setChatsData(result.data);
        } else {
          console.error("Fetched data is not an array:", result.data);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatsData();
  }, [token]);




 
    const fetchChatData = async (chatId) => {
      try {
        const response2 = await fetch(
                  `http://localhost:4000/api/chat/findChat/${chatId}`
,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response2.ok) {
          throw new Error("Network response was not ok " + response2.statusText);
        }
        else {
          console.log('sucessssss')
          const result2 = await response2.json();
console.log(result2.data)
  const firstName = result2.data.users[1].firstName;
  const lastName = result2.data.users[1].lastName;

  const userName = `${firstName} ${lastName}`;
  console.log(userName);
setUserName(userName)
          const selectedChat = result2.data._id
          setSelectedChat(selectedChat)
} 
      } catch (error) {
        console.error("Error fetching chat content:", error);
      }
    };

  


  const handleChatClick = async (chatId) => {
    setSelectedChat(chatId === selectedChat ? null : chatId);
    if (chatId !== selectedChat) {
      await fetchChatData(chatId);
    } else {
      setChatDetails(null);
    }
  };
          console.log('idddddddddd', selectedChat)




  
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
            <ChatTopbar selectedChat={selectedChat} chatDetails={chatDetails} userName={userName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
