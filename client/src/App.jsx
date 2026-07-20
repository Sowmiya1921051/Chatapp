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

// Create Socket Connection
const socket = io(SOCKET_URL);

function App() {
  // Username State
  const [username, setUsername] = useState("");

  // Join Chat State
  const [isJoined, setIsJoined] = useState(false);

  // Messages State
  const [messages, setMessages] = useState([]);

  // Fetch Chat History
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(API_URL);
        setMessages(res.data);
      } catch (error) {
        console.log("Error Fetching Messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Listen for Socket Messages
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Join Chat
  const handleJoin = () => {
    if (!username.trim()) return;

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

      <Header username={username} />

      <ChatBox
        messages={messages}
        currentUser={username}
      />

      <InputBox
        username={username}
        socket={socket}
      />

    </div>
  );
}

export default App;