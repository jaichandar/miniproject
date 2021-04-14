const Joi = require('joi')

module.exports.registerValidation = (value)=>{
    const schema = Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(6).required()
    })
    return schema.validate(value)
}

module.exports.loginValidation = (value)=>{
    const schema = Joi.object({
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(6).required()
    })
    return schema.validate(value)
}
