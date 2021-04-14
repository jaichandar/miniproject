const Brand = require('../models/brand.model')
const wrapper = require('../constraints/wrapper/wrapper')
const Auth = require('../constraints/wrapper/verifytoken')

module.exports.create = async(req,res)=>{
    try{
        const brand = await Brand()
        buildNewBrand(req,brand)
        let docs = await brand.save()
        res.status(wrapper.createCode).json({
            message:wrapper.createValue,
            uid:docs._id
        }) 
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:err
        })
    }
}

function buildNewBrand(req,brand){
    brand.BrandName = req.body.BrandName || brand.BrandName
    brand.Description = req.body.Description || brand.Description
    brand.ProductDetailsId = req.body.ProductDetailsId || brand.ProductDetailsId
}

module.exports.getAll = async(req,res)=>{
    try{
        console.log(req.user)
     const brand = await Brand.find()
     res.status(wrapper.successCode).json({
        message:wrapper.successValue,
        value:brand
     })
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            value:'invalid credentials'
        })
    }
}

module.exports.getById = async(req,res)=>{
    try{
       
      const brand = await Brand.findById({_id:req.params.id})
      if(!brand){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:brand
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
      const brand = await Brand.findByIdAndUpdate({_id:req.params.id})
      if(!brand){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      buildNewBrand(req,brand)
      let docs = await brand.save()
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
     const brand = await Brand.deleteOne({_id:req.params.id})
     if(!brand){
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
