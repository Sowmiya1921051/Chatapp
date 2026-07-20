import React from "react";

const UserList = ({
  users,
  currentUser,
  selectedUser,
  onSelect,
}) => {
  return (
    <div className="user-list">

      <h3 className="user-list-title">
        Online Users
      </h3>

      {users.length <= 1 ? (
        <p className="no-users">
          No other users online
        </p>
      ) : (
        users
          .filter((user) => user !== currentUser)
          .map((user, index) => (
            <div
              key={index}
              className={`user-item ${
                selectedUser === user ? "active-user" : ""
              }`}
              onClick={() => onSelect(user)}
            >
              <div className="user-avatar">
                {user.charAt(0).toUpperCase()}
              </div>

              <div className="user-details">
                <span className="user-name">
                  {user}
                </span>

                <span className="user-status">
                  🟢 Online
                </span>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default UserList;