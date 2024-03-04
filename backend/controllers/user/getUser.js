const User = require("../../models/userModel")

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const checkUser = await User.findById(id)

        if (!checkUser) {
            return res.status(404)
                .send({ status: "fail", message: "User not found..." })
        }
        res.status(200)
            .send({ status: "success", data: { userId: checkUser._id, name: checkUser.username } })

    } catch (error) {
        return res.status(404)
            .send({ status: "fail", message: "User not found...", error: error.message })
    }
}

module.exports = getUser