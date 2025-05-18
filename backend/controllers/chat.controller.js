const Message = require('../models/message.model');
const User = require('../models/user.model');

exports.getChatHistory = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort('timestamp');
    
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};