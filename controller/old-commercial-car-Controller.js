const {uploadOldCommercialSchema, updateOldCommercialSchema} = require('../helper/validators')
const oldCommercialCarService = require("../services/old-commercial-car-service")

const uploadOldCommercial= async(req, res, next)=>{
    const {error} = await uploadOldCommercialSchema.validate(req.body)
    if(error){
        console.log(error)
        return res.status(400).json({
           success: false,
           error: error.details[0].message
        })

    }
    await oldCommercialCarService.uploadOldCommercialCar(req, res, next)
};

const updateOldCommercial = async(req, res, next)=>{
 const {error} = await updateOldCommercialSchema.validate(req.body)
 if (error){
    console.log(error)
    return res.status(400).json({
        success: false,
        error: error.details[0].message
    })
 }
 await oldCommercialCarService.updateOldCommercialCar(req, res, next)
}

module.exports = {
    uploadOldCommercial,
    updateOldCommercial    
}
