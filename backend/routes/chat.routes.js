const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/history/:userId/:otherUserId', 
  authMiddleware.authUser, 
  chatController.getChatHistory
);

module.exports = router;