const User = require("../../models/userModel");
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');

const registerUser = async (req, res) => {
    const { username, email, password, profilePic } = req.body
    if (!username || !email || !password) {
        return res.status(400).send("username, email or password is required...")
    }
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    });
    const upload = multer({ storage: storage });

    try {
        const checkUser = await User.find({ email })
        if (checkUser) {
            return res.status(400).send({ status: "fail", message: "User Already exists..." })
        }

        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const userData = {
            username: username.replaceAll(' ', "").toLowerCase(),
            email: email.toLowerCase(),
            profilePic,
            password: hashedPassword,
        }
        const user = new User(userData)

        const savedUser = await user.save()
        if (!savedUser) {
            return res.status(400).send({ message: "Something went wrong! User not saved..." })

        } else {
            res.status(200)
                .send({ status: "success", message: "User registered successfully...", data: savedUser })
        }

    } catch (error) {
        return res.status(400).send({ message: "Something went wrong...", error: error.message })
    }
}

module.exports = registerUser