const mongoose = require('mongoose')

const old_commercial_car = new mongoose.Schema({
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
    
    carrier_permit_image:{
        type: String,
        required: true
    },
    heavy_goods_permit_image:{
        type: String,
        required: true
    },
    VIN:{
        type: String,
        unique: true,
        required:[true, "VIN is required"]
    }

})

module.exports = mongoose.model('oldcommercial', old_commercial_car)