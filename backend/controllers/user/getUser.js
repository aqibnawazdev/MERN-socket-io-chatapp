const User = require("../../models/userModel")

const getUser = async (req, res) => {
    try {
        const username = req.params.username
        const checkUser = await User.findOne({ username })

        if (!checkUser) {
            return res.status(404)
                .send({ status: "fail", message: "User not found..." })
        }
        res.status(200)
            .send({ status: "success", user: { userId: checkUser._id, username: checkUser.username, photoURL: checkUser.photoURL } })

    } catch (error) {
        return res.status(404)
            .send({ status: "fail", message: "User not found...", error: error })
    }
}

module.exports = getUser