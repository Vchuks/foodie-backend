const express = require("express")
const router = express.Router()
const Joi = require("joi")
const bcrypt = require("bcrypt")
const { User } = require("../../models/users")

router.post("/", async (req, res) => {
    
    const { error } = loginValidation(req.body)
    if (error) {
        
        return res.status(400).json(error.details[0].message)
    }
    // check if user exists 
    const getUser = await User.findOne({ email: req.body.email })

    if (!getUser) {
        return res.status(400).json("Invalid email or password")
    }

    // check if password matches that of the user 
    const validPassword = await bcrypt.compare(req.body.password, getUser.password)

    if (!validPassword) {
        return res.status(400).json("Invalid username or password")
    }

    if (getUser && validPassword){
        const token = getUser.createToken()
        res.header("x-auth-token", token).json({name: getUser.fullname, email: getUser.email, token: token})

        // res.json({
        //     name: getUser.fullname,
        //     email: getUser.email,
        //     userToken: token 
        // })
    }


})

function loginValidation(data) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(25).required()
    })
    return schema.validate(data)
}

module.exports = router