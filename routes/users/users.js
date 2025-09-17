const express = require('express')
const router = express.Router()
const authM = require("../../middlewares/auth")
const {User} = require("../../models/users")

router.get("/loggedinuser", authM, async(req, res)=>{
    
    const result = await User.findById(req.eachUser.id).select("-password")
    res.send(result)
})

module.exports = router