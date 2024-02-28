const express = require("express");
const getUser = require("../controllers/userController/getUser");
const registerUser = require("../controllers/authController/registerUser");
const updateUser = require("../controllers/userController/updateUser");
const deleteUser = require("../controllers/userController/deleteUser");
const loginUser = require("../controllers/authController/loginUser");
const getAllUsers = require("../controllers/userController/getAllUsers");
const authorize = require("../middleware/auth");
const logoutUser = require("../controllers/authController/logoutUser");

const router = express.Router()

router.get('/user/login', loginUser);
router.get('/user', authorize, getUser);
router.get('/users/', authorize, getAllUsers);
router.post('/user/logout', authorize, logoutUser);
router.post('/users/register', registerUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


module.exports = router;