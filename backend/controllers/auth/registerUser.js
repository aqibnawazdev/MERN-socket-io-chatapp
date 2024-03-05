const User = require("../../models/userModel");
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { username, email, password, photoURL } = req.body
    console.log("object", req.body)
    if (!username || !email || !password) {
        return res.status(400).send("username, email or password is required...")
    }

    try {
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.status(400).send({ status: "fail", message: "User Already exists..." })
        }

        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const userData = {
            username: username,
            email: email.toLowerCase(),
            photoURL,
            password: hashedPassword,
        }
        const user = new User(userData)

        const savedUser = await user.save()
        if (!savedUser) {
            return res.status(400).send({ message: "Something went wrong! User not saved..." })

        } else {
            res.status(200)
                .send({ status: "success", message: "User registered successfully...", user: savedUser })
        }

    } catch (error) {
        return res.status(400).send({ message: "Something went wrong...", error: error.message })
    }
}

module.exports = registerUser