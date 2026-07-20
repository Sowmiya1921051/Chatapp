import React from "react";

const Header = ({ username }) => {
  return (
    <header className="chat-header">
      <div className="header-left">
        <h2>💬 Real-Time Chat App</h2>
      </div>

      <div className="header-right">
        <div className="user-info">
          <span className="status"></span>

          <span className="username">
            {username}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;