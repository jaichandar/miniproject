const User = require('../models/user.model')
const Role = require('../models/role.model')
const wrapper = require('../constraints/wrapper/wrapper')


module.exports.create = async(req,res)=>{
    try{
        const role = await Role.findById(req.body.roleType)
        if(!role){
            return res.status(wrapper.notfoundCode).json({
                message:wrapper.notFound,
                value:'invalid credientials'
            })
        }
     const user = await User()
     buildNewUser(req,user)
     let docs = await user.save()
     res.status(wrapper.createCode).json({
        message:wrapper.createValue,
        value:docs
    })
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:err
        })
    }
}

function buildNewUser(req,user){
    user.Name = req.body.Name || user.Name,
    user.PhoneNumber = req.body.PhoneNumber || user.PhoneNumber
    user.City = req.body.City || user.City
    user.roleType = req.body.roleType || user.roleType
}

module.exports.getAll = async(req,res)=>{
    try{
      const user = await User.find().populate({path:'role',model:'roletype'})
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:user
      })
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:err
        })
    }
}

module.exports.getById = async(req,res)=>{
    try{
     const user = await User.findById({_id:req.params.id})
     if(!user){
         return res.status(wrapper.notfoundCode).json({
            message:wrapper.notFound,
            value:'invalid id'
        })
    }
     res.status(wrapper.successCode).json({
        message:wrapper.successValue,
        value:user
    })
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:err
        })
    }
}

module.exports.updateId = async(req,res)=>{
    try{
     const user = await User.findByIdAndUpdate({_id:req.params.id})
     if(!user){
        return res.status(wrapper.notfoundCode).json({
            message:wrapper.notFound,
            value:"invalid credantials"
        })
    }
    buildNewUser(req,user)
    let docs = await user.save()
    res.status(wrapper.successCode).json({
        message:wrapper.successValue,
        value:docs
    })
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:err
        })
    }
}

module.exports.deleteId = async(req,res)=>{
    try{ 
     const user = await User.deleteOne({_id:req.params.id})
     if(!user){
         return res.status(wrapper.notfoundCode).json({
             message:wrapper.notFound,
             value:'invalid credientials'
         })
     }
    res.status(wrapper.successCode).json({
        message:wrapper.successValue,
        value:user
    })
    }catch(err){ 
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:err
        })
    }
}