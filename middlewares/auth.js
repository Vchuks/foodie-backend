const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function checkAuthentication(req, res, next) {
    const token = req.header("x-auth-token")
    if (!token) {
        return res.status(401).send("Access Denied, no token")
    }

    try {
        const verifiedToken = jwt.verify(token, config.get("jwtSecretKey"))
        req.eachUser = verifiedToken
        next()
    } catch (ex) {
    console.log(ex)
        res.status(400).send("Invalid token")
    }
}