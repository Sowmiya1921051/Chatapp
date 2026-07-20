import React, { useEffect, useRef } from "react";
import Message from "./Message";

const ChatBox = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-box">
      {messages.length === 0 ? (
        <div className="empty-chat">
          <p>No messages yet.</p>
          <p>Start the conversation 👋</p>
        </div>
      ) : (
        messages.map((msg) => (
          <Message
            key={msg._id}
            message={msg}
            currentUser={currentUser}
          />
        ))
      )}

      {/* Auto-scroll target */}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;