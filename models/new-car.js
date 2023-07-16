const mongoose = require('mongoose')

const newCar = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    owner_passport_image:{
        type: String,
        required: true
    },
    license_id:{
        type: String,
        required:[true, "license_id is required"]
    },
    attestation_letter_image:{
        type: String,
        required: true
    },
    purchase_receipt_image:{
        type: String,
        required: true
    },
    delivery_note_image:{
        type: String,
        required: true
    },
    
    proof_of_ownership_image:{
        type: String,
        required: true
    },
    VIN:{
        type: String,
        unique: true,
        required:[true, "VIN is required"]
    }


})

module.exports = mongoose.model('newcar', newCar)