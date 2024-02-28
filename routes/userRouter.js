const express = require("express");
const getUser = require("../controllers/user/getUser");
const registerUser = require("../controllers/user/registerUser");
const updateUser = require("../controllers/user/updateUser");
const deleteUser = require("../controllers/user/deleteUser");

const router = express.Router()

router.get('/users/:id', getUser);
router.post('/users/', registerUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


module.exports = router;