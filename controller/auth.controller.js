const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const regitser = require('../models/auth.model')
const wrapper = require('../constraints/wrapper/wrapper')
const {registerValidation,loginValidation} = require('../constraints/wrapper/validation')

module.exports.create = async(req,res)=>{
    try{
      const {error} = registerValidation(req.body)
      if(error){
          return res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:error.details[0].message
        })
    }
    const emailExist = await regitser.findOne({email:req.body.email})
    if(emailExist){
        return res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            value:'email already exist'
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    const register = await regitser({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
    const result = await register.save()
    res.status(wrapper.createCode).json({
        message:wrapper.successValue,
        uid:result._id
    })
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:err
        })
    }
}

module.exports.login = async(req,res)=>{
    try{
      const {error} = loginValidation(req.body)
      if(error){
          return res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:error.details[0].message
        })
    }
    console.log('=====>login')
    const user = await regitser.findOne({email:req.body.email})
        if(!user){
            return res.status(wrapper.failureCode).json({
                message:wrapper.failureValue,
                value:'invalid credentials'
            })
        }
        console.log('=====>passwordcompare')
    const comparePassword = await bcrypt.compare(req.body.password,user.password)
    if(!comparePassword){
        return res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            value:'invalid credentials'
        })
    }
     console.log('====>payload')
        const payload = {
            _id:user._id
        }
       let Signature = await jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'5d'
        })   
        res.header('auth-token',Signature).json({
            message:wrapper.successValue,
            value:Signature
        })
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:err
        })
    }
}
