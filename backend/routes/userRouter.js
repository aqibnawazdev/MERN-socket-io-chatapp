const express = require("express");
const getUser = require("../controllers/user/getUser");
const updateUser = require("../controllers/user/updateUser");

const getAllUsers = require("../controllers/user/getAllUsers");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router()

router.get('/users/:username', verifyToken, getUser);
router.get('/users/', verifyToken, getAllUsers);
router.put('/users/:id', verifyToken, updateUser);
module.exports = router;