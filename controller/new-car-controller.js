
const {uploadNewSchema, updateNewSchema} = require('../helper/validators')
const newCarService = require("../services/new-car-service")

const uploadNew= async(req, res, next)=>{
    const {error} = await uploadNewSchema.validate(req.body)
    if(error){
        console.log(error)
        return res.status(400).json({
           success: false,
           error: error.details[0].message
        })

    }
    await newCarService.uploadNewCar(req, res, next)
};

const updateNew = async(req, res, next)=>{
 const {error} = await updateNewSchema.validate(req.body)
 if (error){
    console.log(error)
    return res.status(400).json({
        success: false,
        error: error.details[0].message
    })
 }
 await newCarService.updateNewCar(req, res, next)
}

module.exports = {
    uploadNew,
    updateNew    
}


