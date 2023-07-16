const mongoose = require('mongoose')

const oldPrivateCar = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    car_license_image:{
        type: String,
        required: true
    },
    license_id:{
        type: String,
        required:[true, "license_id is required"]
    },
    roadworthiness_image:{
        type: String,
        required: true
    },
    roadworthiness_id:{
        type: String,
        required: [true, "roadworthiness_id is required"]
    },
    insurance_image:{
        type: String,
        required: true
    },
    VIN:{
        type: String,
        unique: true,
        required:[true, "VIN is required"]
    }

})

module.exports = mongoose.model('oldprivatecar', oldPrivateCar)

