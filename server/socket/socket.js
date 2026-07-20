const Message = require("../models/Message");

const users = {};

const socketHandler = (io) => {

    io.on("connection", (socket) => {

        console.log("User Connected:", socket.id);

        // Join Chat
        socket.on("join", (username) => {

            users[socket.id] = username;

            io.emit("onlineUsers", Object.values(users));

        });

        // Send Message
        socket.on("sendMessage", async (data) => {

            try {

                const savedMessage = await Message.create({
                    username: data.username,
                    message: data.message,
                });

                io.emit("receiveMessage", savedMessage);

            } catch (error) {

                console.log(error.message);

            }

        });

        // Typing
        socket.on("typing", (username) => {

            socket.broadcast.emit("typing", username);

        });

        // Stop Typing
        socket.on("stopTyping", () => {

            socket.broadcast.emit("stopTyping");

        });

        // Disconnect
        socket.on("disconnect", () => {

            delete users[socket.id];

            io.emit("onlineUsers", Object.values(users));

            console.log("User Disconnected:", socket.id);

        });

    });

};

module.exports = socketHandler;