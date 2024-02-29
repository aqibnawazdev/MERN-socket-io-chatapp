const express = require("express");
const getUser = require("../controllers/userController/getUser");
const updateUser = require("../controllers/userController/updateUser");
const deleteUser = require("../controllers/userController/deleteUser");

const getAllUsers = require("../controllers/userController/getAllUsers");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router()

router.get('/users', verifyToken, getUser);
router.get('/users/', verifyToken, getAllUsers);
router.put('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);


module.exports = router;