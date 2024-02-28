const User = require("../../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginUser = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).send({ status: "fail", message: "Username or Password is empty..." })
    }

    try {
        const checkUser = await User.findOne({ email })
        if (!checkUser) {
            return res.status(404)
                .send({ status: "Fail...", message: "Invalid email or password..." })
        }

        const verifyUser = await bcrypt.compare(password, checkUser.password)
        if (!verifyUser) {
            return res.status(404).send({ status: "fail", message: "Wrong Email or password" })
        }

        const payLoad = {
            userId: checkUser._id,
            email: checkUser.email,
            username: checkUser.username
        }
        const token = jwt.sign(payLoad, process.env.TOKEN_SECRET, { expiresIn: "1h" })


        res
            .cookie("Auth-Token", token, { HttpOnly: true, expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) })
            .status(200)
            .send({ status: "success", message: "Logged in successfully.." })


    } catch (error) {
        return res.status(404).send({ message: "Something went wrong...", error: error.message })
    }
}

module.exports = loginUser