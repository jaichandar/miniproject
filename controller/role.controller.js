const Role = require('../models/role.model')
const wrapper = require('../constraints/wrapper/wrapper')

module.exports.create = async(req,res)=>{
    try{
        const role = await Role()
        buildNewRole(req,role)
        let docs = await role.save()
        res.status(wrapper.createCode).json({
            message:wrapper.createValue,
            value:docs._id
        })
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:err
        })
    }
}

function buildNewRole(req,role){
    role.roleType = req.body.roleType || role.roleType
    role.description = req.body.description || role.description
}

module.exports.getAll = async(req,res)=>{
   try{
     const role = await Role.find()
     res.status(wrapper.successCode).json({
         message:wrapper.successValue,
         value:role
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
      const role = await Role.findById({_id:req.params.id})
      if(!role){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:role
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
      const role = await Role.findByIdAndUpdate({_id:req.params.id})

      if(!role){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }

      buildNewRole(req,role)
      let docs = await role.save()
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
    const role = await Role.deleteOne({_id:req.params.id})

    if(!role){
        return res.status(wrapper.notfoundCode).json({
            message:wrapper.notFound,
            value:'invalid credentials'
        })
    }

    res.status(wrapper.successCode).json({
        message:wrapper.successValue,
        value:'deleted'
    })
  }catch(err){
      res.status(wrapper.failureCode).json({
          message:wrapper.failureValue,
          error:err
      })
  }
}