const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const { createMessage } = require("../controllers/message/message");
const router = express.Router()

router.post('/messages', verifyToken, createMessage);
module.exports = router;