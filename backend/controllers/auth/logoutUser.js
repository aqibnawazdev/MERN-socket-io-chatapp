
const logoutUser = async (req, res) => {
    res.status(200).clearCookie("accessToken", { sameSite: "none", secure: true, httpOnly: true }).send({ status: "success", message: "Logged out successfully..." })

}

module.exports = logoutUser