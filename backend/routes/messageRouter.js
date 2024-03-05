const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const { createMessage, getMessages } = require("../controllers/message/message");
const router = express.Router()

router.post('/messages', verifyToken, createMessage);
router.get('/messages/:id', verifyToken, getMessages);
module.exports = router;