const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const { createMessage, getMessages } = require("../controllers/message/message");
const router = express.Router()

router.post('/messages', createMessage);
router.get('/messages/:id', getMessages);
module.exports = router;