const express = require("express")
const router = express.Router()
const { User, validateUser } = require("../../models/users")
const _ = require("lodash")
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
    // validate user inputs

        const validateResult = validateUser(req.body)
        if (validateResult.error) {
            return res.status(400).json(validateResult.error.details[0].message)
        }

        //check if user exists
        const getUser = await User.findOne({ email: req.body.email })
        if (getUser) {
            return res.status(400).json("User already exists!")
        }

        const newUser = new User(_.pick(req.body, ["fullname", "email", "phonenumber", "password"]))

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newUser.password, salt)
        newUser.password = hashedPassword

        const result = await newUser.save()
        res.json({message: "successful"})
    

})

module.exports = router