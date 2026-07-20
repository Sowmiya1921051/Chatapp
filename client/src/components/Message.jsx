import React from "react";

const Message = ({ message, currentUser }) => {
  const isOwnMessage = message.username === currentUser;

  return (
    <div
      className={`flex mb-4 ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-md lg:max-w-lg rounded-2xl shadow-md px-4 py-3 ${
          isOwnMessage
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`font-semibold text-sm ${
              isOwnMessage ? "text-indigo-100" : "text-indigo-600"
            }`}
          >
            {message.username}
          </span>

          <span
            className={`text-xs ml-4 ${
              isOwnMessage ? "text-indigo-200" : "text-gray-500"
            }`}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <p className="text-sm leading-6 break-words">
          {message.message}
        </p>
      </div>
    </div>
  );
};

export default Message;