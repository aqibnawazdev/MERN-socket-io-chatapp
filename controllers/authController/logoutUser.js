
const logoutUser = async (req, res) => {
    console.log("logout")

    res.status(200).clearCookie("Auth-Token", "").send({ status: "success", message: "Logged out successfully..." })

}

module.exports = logoutUser