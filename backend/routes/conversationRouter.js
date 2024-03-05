const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const { getSingleConversation, createConversation } = require("../controllers/conversation/conversation");
const { getAllConversation } = require("../controllers/conversation/conversation");
const router = express.Router()

router.get('/conversations/:selectedUserId', verifyToken, getSingleConversation);
router.post('/conversations/:selectedUserId', verifyToken, createConversation);
router.get('/conversations', verifyToken, getAllConversation);


module.exports = router;