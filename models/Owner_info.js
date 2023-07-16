const mongoose = require('mongoose')

const ownerModel = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    identity_number:{
        type: String,
        required:[true, "identity_number is required"]
    },
    first_name:{
        type: String,
        required:[true, "first_name is required"]
    },
    last_name:{
        type: String,
        required: [true, "last_name is required"]
    },
    date_of_birth:{
        type: String,
        required: [true, "date of birth_of_birth is required"]
    },
    age:{
        type: Number,
        required:[true, "age is required"]
    },
    
    email:{
        type: String,
        unique: true,
        required:[true, "email is required"],
    },
    gender:{
        type: String,
        enum: ["M", "F"],
        required: [true, "gender is required"]
    },
    local_government:{
        type: String,
        required:[true, "local_government is required"]
    },
    state:{
        type: String,
        required:[true, "state is required"]
    },
    identity_card: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Owner', ownerModel)