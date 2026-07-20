# Real-Time Chat Application

A full-stack Real-Time Chat Application built with **React.js**, **Node.js**, **Express.js**, **Socket.io**, and **MongoDB**.

The application enables users to exchange messages instantly, view chat history after refreshing, and communicate through a clean and responsive web interface.

---

## Features

- Real-time messaging using Socket.io
- Send and receive messages instantly
- Chat history persistence using MongoDB
- Display message timestamps
- Responsive user interface
- Dummy username-based login
- Automatic scroll to the latest message
- REST APIs for fetching and storing messages
- Clean project architecture

---

# Tech Stack

## Frontend

- React.js (Vite)
- Axios
- Socket.io Client
- CSS

## Backend

- Node.js
- Express.js
- Socket.io
- MongoDB
- Mongoose

---

# Project Structure

```
chat-app/

│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Project Setup Instructions

Clone the repository

```bash
git clone <your-github-repository-url>
```

Move into the project directory

```bash
cd chat-app
```

---

# Backend Setup

Navigate to the backend

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

Start the backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal

Navigate to frontend

```bash
cd client
```

Install dependencies

```bash
npm install
```

Start React

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Environment Variables

Backend

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

No environment variables are required for the frontend in this project.

---

# API Endpoints

## Get Chat History

```
GET /api/messages
```

Returns all stored chat messages.

---

## Send Message

```
POST /api/messages
```

Request Body

```json
{
  "username": "John",
  "message": "Hello"
}
```

---

# Socket Events

Client emits

```
sendMessage
```

Server broadcasts

```
receiveMessage
```

---

# Design Decisions

- React.js was chosen for the frontend because it provides a fast and component-based architecture.
- Express.js was used for creating REST APIs.
- Socket.io was selected to provide real-time bidirectional communication.
- MongoDB stores chat history so messages remain available after refreshing the page.
- The application follows a modular folder structure with separate controllers, routes, models, and socket logic.
- Components are separated into Header, ChatBox, Message, and InputBox to improve maintainability and reusability.

---

# Assumptions Made

- Only one global chat room is available.
- Authentication is simulated using a username entered before joining the chat.
- Messages are broadcast to all connected users.
- Internet connectivity is assumed while chatting.
- The backend server and MongoDB database are running before starting the frontend.

---

# Bonus Features Implemented

- Username-based login (Dummy Authentication)
- MongoDB message storage
- Automatic message timestamps
- Responsive UI
- Automatic scroll to the latest message

---

# Bonus Features Not Implemented

- Typing Indicator
- Online/Offline User Status
- Message Read Status
- Message Delivered Status

These features can be added in future updates using additional Socket.io events.

---

# Future Improvements

- Private chat rooms
- JWT Authentication
- User registration and login
- Typing indicator
- Online users list
- Read receipts
- Image sharing
- File uploads
- Emoji support
- Notifications

---

# Deployment

Frontend

```
Localhost
```

Backend

```
Localhost
```

If deployed, update this section with your Render or Railway URL.

Example

```
https://chat-app-api.onrender.com
```

---

# Author

**Sowmiya N**

Software Engineer

GitHub:

```
https://github.com/your-github-username
```
