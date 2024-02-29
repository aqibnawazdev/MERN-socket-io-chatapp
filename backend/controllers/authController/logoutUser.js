
const logoutUser = async (req, res) => {

    res.status(200).clearCookie("jwt").send({ status: "success", message: "Logged out successfully..." })

}

module.exports = logoutUser