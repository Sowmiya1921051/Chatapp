const Message = require("../models/Message");

// Fetch chat history
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Save new message
const sendMessage = async (req, res) => {
  try {
    const { username, message } = req.body;

    const newMessage = await Message.create({
      username,
      message
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};