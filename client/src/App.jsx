import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";

const API_URL = "http://localhost:5000/api/messages";
const SOCKET_URL = "http://localhost:5000";

const socket = io(SOCKET_URL);

function App() {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(API_URL);
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("typing", (username) => {
      setTypingUser(`${username} is typing...`);
    });

    socket.on("stopTyping", () => {
      setTypingUser("");
    });

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

  const handleJoin = () => {
    if (!username.trim()) return;

    socket.emit("join", username);
    setIsJoined(true);
  };

  // Login Screen
  if (!isJoined) {
    return (
      <div className="min-h-screen  flex items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

          <h1 className="text-4xl font-bold text-center text-pink-600 mb-3">
            💬 Chat App
          </h1>

          <p className="text-gray-500 text-center mb-8">
            Join the real-time conversation
          </p>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <button
            onClick={handleJoin}
            className="w-full mt-5 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Join Chat
          </button>

        </div>
      </div>
    );
  }

  // Chat Screen
  return (
  <div className="min-h-screen bg-slate-200 flex items-center justify-center p-6">

    <div className="w-full max-w-4xl h-[88vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">

      <Header
        username={username}
        onlineUsers={onlineUsers}
      />

      <div className="flex-1 overflow-y-auto bg-slate-100 p-6">

        <ChatBox
          messages={messages}
          currentUser={username}
        />

      </div>

      {typingUser && (
        <div className="px-6 py-2 text-sm text-green-600 italic">
          {typingUser}
        </div>
      )}

      <div className="border-t bg-white p-5">
        <InputBox
          username={username}
          socket={socket}
        />
      </div>

    </div>

  </div>
);  
}

export default App;