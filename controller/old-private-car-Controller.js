const {uploadOldPrivateSchema, updateOldPrivateSchema} = require('../helper/validators')
const oldPrivateCarService = require("../services/old-private-car-service")

const uploadOldPrivate= async(req, res, next)=>{
    const {error} = await uploadOldPrivateSchema.validate(req.body)
    if(error){
        console.log(error)
        return res.status(400).json({
           success: false,
           error: error.details[0].message
        })

    }
    await oldPrivateCarService.uploadOldPrivateCar(req, res, next)
};

const updateOldPrivate = async(req, res, next)=>{
 const {error} = await updateOldPrivateSchema.validate(req.body)
 if (error){
    console.log(error)
    return res.status(400).json({
        success: false,
        error: error.details[0].message
    })
 }
 await oldPrivateCarService.updateOldPrivateCar(req, res, next)
}

module.exports = {
    uploadOldPrivate,
    updateOldPrivate    
}