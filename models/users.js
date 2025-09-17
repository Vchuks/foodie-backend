const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const config = require("config")

const FoodieUser = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 150
    },
    phonenumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 15
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    
})

FoodieUser.methods.createToken = function () {
    const token = jwt.sign({
         id: this._id,
         email: this.email 
        }, config.get("jwtSecretKey"))
    return token
}

const User = mongoose.model("user", FoodieUser)


function validateUser(userData) {
    const schema = Joi.object({
        fullname: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(30).email(),
        phonenumber: Joi.string().required().min(8).max(15),
        password: Joi.string().min(5).max(20).required()
    })

    return schema.validate(userData)
}

module.exports = { User, validateUser }