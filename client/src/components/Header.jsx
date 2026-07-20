import React from "react";

const Header = ({ username, onlineUsers }) => {
  return (
    <header className="chat-header">
      <div>
        <h2>💬 Real-Time Chat App</h2>
      </div>

      <div>
        <p>Welcome, {username}</p>
        <p>🟢 Online Users: {onlineUsers.length}</p>
      </div>
    </header>
  );
};

export default Header;