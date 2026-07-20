import React, { useState } from "react";

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
    <div className="input-container">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default InputBox;