const express = require('express')
const router = express.Router()
const authM = require("../../middlewares/auth")
const {User} = require("../../models/users")

router.get("/", async(req, res) => {
    const result = await User.find().select("fullname phonenumber")
    res.json(result)
})

router.get("/loggedinuser", authM, async(req, res)=>{
    
    const result = await User.findById(req.eachUser.id).select("-password")
    res.json(result)
})



module.exports = router