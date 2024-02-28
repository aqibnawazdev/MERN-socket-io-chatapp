const jwt = require('jsonwebtoken')
require('dotenv').config()

const authorize = (req, res, next) => {

    try {
        const token = req.headers["auth-token"].split(";")[0];
        if (!token) {
            return res.status(404).send({ status: "fail", message: "You are not Authorized! Please login first" })
        }
        const decode = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userId = decode.userId
        next()
    } catch (error) {
        return res.status(404).send({ status: "fail", message: "Invalid Token..." })
    }


}

module.exports = authorize