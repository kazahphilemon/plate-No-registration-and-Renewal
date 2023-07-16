const mongoose = require('mongoose')
const {isEmail} = require("validator")

const UserModel = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    
    email:{
        type: String,
        unique: true,
        required:[true, "email is required"],
        validate:[isEmail, "invalid email"]
    },
    password:{
        type: String,
        required:[true, "password is required"]
    },
    confirm_password:{
        type: String,
        required: [true, "confirm_password is required"]
    },
    Token:{
        type: String,
        default: null
    },
    // resetLink:{
    //     data: String,
    //     default: ''
    // }

},{timestamps:true})

module.exports = mongoose.model('User', UserModel)