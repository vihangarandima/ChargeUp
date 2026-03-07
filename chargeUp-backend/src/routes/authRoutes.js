const express = require("express");
const router = express.Router();

// Import both functions using their exact correct names!
const { register, login } = require("../controllers/authController");

// The Registration Route
router.post("/register", register);

// The Login Route
router.post("/login", login);

module.exports = router;