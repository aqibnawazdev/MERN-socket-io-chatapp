const express = require("express");
const loginUser = require("../controllers/auth/loginUser");
const logoutUser = require("../controllers/auth/logoutUser");
const registerUser = require("../controllers/auth/registerUser");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router()

router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);
router.post('/register', registerUser);

module.exports = router;