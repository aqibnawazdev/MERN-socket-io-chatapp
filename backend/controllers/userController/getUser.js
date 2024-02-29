const User = require("../../models/userModel")

const getUser = async (req, res) => {
    try {
        const { username } = req.body
        const checkUser = await User.findOne({ username })

        if (!checkUser) {
            return res.status(404)
                .send({ status: "fail", message: "User not found..." })
        }
        res.status(200)
            .send({ status: "success", data: checkUser })

    } catch (error) {
        return res.status(404)
            .send({ status: "fail", message: "User not found...", error: error.message })
    }
}

module.exports = getUser