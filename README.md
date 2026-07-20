# 💬 Real-Time Chat Application

A full-stack real-time chat application built using **React.js**, **Node.js**, **Express.js**, **Socket.io**, and **MongoDB**. The application enables users to communicate instantly, view previous messages, display timestamps, and see typing indicators and online user status.

---

# 🚀 Tech Stack

## Frontend

* React.js (Vite)
* Axios
* Socket.io Client
* CSS / Tailwind CSS

## Backend

* Node.js
* Express.js
* Socket.io
* MongoDB
* Mongoose
* dotenv
* cors

---

# 📁 Project Structure

```
ChatApp
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── Header.jsx
│   │   │   ├── ChatBox.jsx
│   │   │   ├── Message.jsx
│   │   │   └── InputBox.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── messageController.js
│   ├── models
│   │   └── Message.js
│   ├── routes
│   │   └── messageRoutes.js
│   ├── sockets
│   │   └── socketHandler.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ✨ Features

* Real-time messaging using Socket.io
* Send and receive messages instantly
* Persistent chat history using MongoDB
* Display message timestamps
* Typing indicator
* Online user count
* Responsive user interface
* Automatic scrolling to the latest message
* REST APIs for fetching and storing messages
* Clean project architecture
* Error handling for API and Socket events

---

# 🔄 Application Flow

## Step 1 - User Opens the Application

The React application loads and displays a login screen.

```
User
   │
   ▼
Enter Username
```

---

## Step 2 - Join Chat

The user enters a username and clicks **Join Chat**.

The frontend emits a Socket.io event.

```
socket.emit("join", username)
```

The backend:

* Stores the connected user
* Updates the online users list
* Broadcasts the latest online users to all connected clients

```
Client
   │
   ▼
Socket.io
   │
   ▼
Server
   │
   ▼
Online Users Updated
```

---

## Step 3 - Load Previous Messages

After joining,

React calls

```
GET /api/messages
```

The backend:

* Fetches messages from MongoDB
* Returns them to the frontend

```
MongoDB
   │
   ▼
Express API
   │
   ▼
React Chat Screen
```

---

## Step 4 - Send Message

When the user types a message and clicks **Send**,

React emits

```
socket.emit("sendMessage")
```

with

```
{
    username,
    message
}
```

---

## Step 5 - Backend Processing

The backend receives the message.

It

* validates the data
* saves the message in MongoDB
* broadcasts the saved message to every connected user

```
Client
   │
   ▼
Socket.io
   │
   ▼
Express Server
   │
   ▼
MongoDB
   │
   ▼
Socket Broadcast
```

---

## Step 6 - Receive Message

Every connected client listens for

```
receiveMessage
```

When a new message arrives,

React updates the chat immediately without refreshing.

```
socket.on("receiveMessage")
```

---

## Step 7 - Typing Indicator

While typing,

the frontend sends

```
socket.emit("typing")
```

The server broadcasts

```
typing
```

Other users see

```
Sowmiya is typing...
```

After one second of inactivity,

```
stopTyping
```

is emitted.

---

## Step 8 - Online User Status

When users connect

```
join
```

When users disconnect

```
disconnect
```

The server updates

```
onlineUsers
```

and broadcasts the latest online user count.

---

# 🌐 REST API

## Fetch Messages

```
GET /api/messages
```

### Response

```
[
  {
    "_id": "...",
    "username": "Sowmiya",
    "message": "Hello",
    "createdAt": "..."
  }
]
```

---

## Send Message

```
POST /api/messages
```

Request

```
{
    "username":"Sowmiya",
    "message":"Hello"
}
```

---

# 🔌 Socket Events

## Client → Server

```
join
sendMessage
typing
stopTyping
disconnect
```

---

## Server → Client

```
receiveMessage
typing
stopTyping
onlineUsers
```

---

# 🗄 Database Schema

```
Message

_id

username

message

createdAt

updatedAt
```

---

# ⚙ Environment Variables

Create a `.env` file inside the server folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

# ▶ Running the Backend

```
cd server

npm install

npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

# ▶ Running the Frontend

```
cd client

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 📦 Dependencies

Frontend

* React
* Axios
* Socket.io Client

Backend

* Express
* Socket.io
* Mongoose
* dotenv
* cors
* nodemon

---

# 🏗 Design Decisions

* React functional components with Hooks
* Component-based architecture
* Separate REST API and Socket.io layers
* MongoDB for persistent message storage
* Real-time communication using Socket.io
* Modular backend structure for maintainability

---

# 📌 Assumptions

* Username is entered manually (dummy login)
* No authentication or password is required
* All users share a common chat room
* Internet connection is available
* MongoDB database is running and accessible

---

# 🌟 Bonus Features Implemented

* Dummy username login
* Typing indicator
* Online user status
* MongoDB message persistence

---

# 🚀 Future Improvements

* Private one-to-one chat
* Group chat
* Message read status
* Delivered status
* Image sharing
* Emoji support
* Authentication with JWT
* User profile pictures
* Notifications
* File sharing

---

# 👩‍💻 Author

**Sowmiya N**

Software Engineer
GitHub: https://github.com/Sowmiya1921051
