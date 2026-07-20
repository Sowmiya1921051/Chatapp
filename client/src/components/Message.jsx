import React from "react";

const Message = ({ message, currentUser }) => {
  // Check if the message belongs to the logged-in user
  const isOwnMessage = message.username === currentUser;

  return (
    <div className={`message ${isOwnMessage ? "own-message" : ""}`}>
      <div className="message-header">
        <span className="username">{message.username}</span>

        <span className="timestamp">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="message-body">
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default Message;