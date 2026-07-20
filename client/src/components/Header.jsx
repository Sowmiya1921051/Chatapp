import React from "react";

const Header = ({ username, onlineUsers }) => {
  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 border-b shadow-sm">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">
          {username.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-grey-800">
            {username}
          </h2>

          <p className="text-sm text-green-600">
            🟢 {onlineUsers.length} User(s) Online
          </p>
        </div>

      </div>

      <h1 className="text-2xl font-bold text-pink-600">
        💬 Chat App
      </h1>

    </header>
  );
};

export default Header;