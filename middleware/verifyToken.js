const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.jwt
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

module.exports = verifyToken