const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const { getSingleConversation } = require("../controllers/conversation/conversation");
const { getAllConversation } = require("../controllers/conversation/conversation");
const router = express.Router()

router.post('/conversations/single', getSingleConversation);
router.post('/conversations', getAllConversation);


module.exports = router;