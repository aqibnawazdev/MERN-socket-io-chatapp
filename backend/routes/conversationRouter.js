const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { getSingleConversation } = require("../controllers/conversation/conversation");
const { getAllConversation } = require("../controllers/conversation/conversation");
const router = express.Router()

router.post('/conversations/:id', verifyToken, getSingleConversation);
router.get('/conversations', verifyToken, getAllConversation);


module.exports = router;