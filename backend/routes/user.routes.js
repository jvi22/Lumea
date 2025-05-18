const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');
const authMiddleware = require("../middlewares/auth.middleware");

// Registration with username validation
router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body('fullname').isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long'),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long').matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers and underscores'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long')
], userController.registerUser);

// Login remains the same
router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").exists().withMessage("Password is required")
], userController.loginUser);

// Get user profile (no body validation needed for GET)
router.get("/profile/:username", userController.getUserProfile);


// Logout
router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;