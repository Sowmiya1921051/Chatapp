import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";

import "./App.css";

// Backend URLs
const API_URL = "http://localhost:5000/api/messages";
const SOCKET_URL = "http://localhost:5000";

// Socket Connection
const socket = io(SOCKET_URL);

function App() {
  // Username
  const [username, setUsername] = useState("");

  // Join Status
  const [isJoined, setIsJoined] = useState(false);

  // Messages
  const [messages, setMessages] = useState([]);

  // Typing Indicator
  const [typingUser, setTypingUser] = useState("");

  // Online Users
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Fetch Chat History
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(API_URL);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Socket Listeners
  useEffect(() => {
    // Receive Messages
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Typing
    socket.on("typing", (username) => {
      setTypingUser(`${username} is typing...`);
    });

    // Stop Typing
    socket.on("stopTyping", () => {
      setTypingUser("");
    });

    // Online Users
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("onlineUsers");
    };
  }, []);

  // Join Chat
  const handleJoin = () => {
    if (!username.trim()) return;

    socket.emit("join", username);

    setIsJoined(true);
  };

  // Login Screen
  if (!isJoined) {
    return (
      <div className="join-container">
        <div className="join-card">
          <h1>💬 Real-Time Chat App</h1>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button onClick={handleJoin}>
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  // Chat Screen
  return (
    <div className="app">
      <Header
        username={username}
        onlineUsers={onlineUsers}
      />

      <ChatBox
        messages={messages}
        currentUser={username}
      />

      {typingUser && (
        <div className="typing-indicator">
          {typingUser}
        </div>
      )}

      <InputBox
        username={username}
        socket={socket}
      />

      
    </div>
  );
}

export default App;