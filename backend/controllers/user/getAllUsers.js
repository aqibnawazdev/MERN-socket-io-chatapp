const User = require("../../models/userModel")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findOne()

        if (!users) {
            return res.status(404)
                .send({ status: "fail", message: "User not found..." })
        }
        res.status(200)
            .send({ status: "success", data: users })

    } catch (error) {
        return res.status(404)
            .send({ status: "fail", message: "User not found...", error: error.message })
    }
}

module.exports = getAllUsers