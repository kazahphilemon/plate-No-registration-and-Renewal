const Joi = require('joi')

const registerSchema = Joi.object({
 name:Joi.string().min(5).required(),
 email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
 password: Joi.string().min(8).max(24).required(),
 confirm_password: Joi.string().min(8).max(24).required()
})
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})
const uploadNewSchema = Joi.object({
    VIN: Joi.string().min(17).max(17).required(),
    license_id: Joi.string().min(10).required()
})
const updateNewSchema = Joi.object({
    VIN: Joi.string().min(17).max(17).required(),
    license_id: Joi.string().min(10).required()
})
const uploadOldCommercialSchema = Joi.object({
    VIN: Joi.string().min(17).max(17).required(),
    license_id: Joi.string().min(10).required(),
    roadworthiness_id: Joi.string().min(10).required()
})
const updateOldCommercialSchema = Joi.object({
    VIN: Joi.string().min(17).max(17).required(),
    license_id: Joi.string().min(10).required(),
    roadworthiness_id: Joi.string().min(10).required()
})
const uploadOldPrivateSchema = Joi.object({
    VIN: Joi.string().min(17).max(17).required(),
    license_id: Joi.string().min(10).required(),
    roadworthiness_id: Joi.string().min(10).required()
})
const updateOldPrivateSchema = Joi.object({
    VIN: Joi.string().min(17).max(17).required(),
    license_id: Joi.string().min(10).required(),
    roadworthiness_id: Joi.string().min(10).required()
})
module.exports = {
    registerSchema,
    loginSchema,
    uploadNewSchema,
    updateNewSchema,
    uploadOldCommercialSchema,
    updateOldCommercialSchema,
    uploadOldPrivateSchema,
    updateOldPrivateSchema
}