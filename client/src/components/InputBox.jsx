import React, { useState } from "react";
import { Send } from "lucide-react";

const InputBox = ({ username, socket }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      username,
      message,
    });

    socket.emit("stopTyping");

    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", username);

    clearTimeout(window.typingTimeout);

    window.typingTimeout = setTimeout(() => {
      socket.emit("stopTyping");
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-200">

      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
      />

      <button
        onClick={sendMessage}
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 active:scale-95"
      >
        <Send size={18} />
        Send
      </button>

    </div>
  );
};

export default InputBox;