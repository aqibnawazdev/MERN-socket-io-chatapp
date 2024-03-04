const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res
            .status(400)
            .send({ status: "fail", message: "Username or Password is empty..." });
    }

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res
                .status(404)
                .send({ status: "Fail...", message: "Invalid email or password..." });
        }
        // console.log("checkUser", checkUser)
        const verifyUser = await bcrypt.compare(password, checkUser.password);
        if (!verifyUser) {
            return res
                .status(404)
                .send({ status: "fail", message: "Wrong Email or password" });
        }
        // console.log("verifyUser", verifyUser)


        const payLoad = {
            userId: checkUser._id,
            email: checkUser.email,
            username: checkUser.username,
        };
        const token = jwt.sign(payLoad, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
        });

        const userInfo = {
            userId: checkUser._id,
            username: checkUser.username,
            email: checkUser.email,
            photoURL: checkUser.photoURL,
            token: token

        }
        res
            .cookie("accessToken", token, {
                httpOnly: true,
                secure: true,
                sameSite: true,
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            })
            .status(200)
            .send({ status: "success", message: "Logged in successfully..", user: userInfo });

    } catch (error) {
        return res
            .status(404)
            .send({ message: "Something went wrong...", error: error.message });
    }
};

module.exports = loginUser;
