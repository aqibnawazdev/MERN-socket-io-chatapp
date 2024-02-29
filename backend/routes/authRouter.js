const express = require("express");
const loginUser = require("../controllers/authController/loginUser");
const logoutUser = require("../controllers/authController/logoutUser");
const registerUser = require("../controllers/authController/registerUser");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router()

router.post('/users/login', loginUser);
router.post('/users/logout', verifyToken, logoutUser);
router.post('/users/register', registerUser);

module.exports = router;