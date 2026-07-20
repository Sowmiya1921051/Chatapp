import React, { useState } from "react";

const InputBox = ({ username, socket }) => {
  const [message, setMessage] = useState("");

  // Send Message
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      username,
      message,
    });

    setMessage("");
  };

  // Send on Enter Key
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
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default InputBox;