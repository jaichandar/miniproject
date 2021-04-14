const shopDetails = require('../models/shopdetails')
const wrapper = require('../constraints/wrapper/wrapper')


module.exports.create = async(req,res)=>{
    try{
      const shopdetail = await shopDetails()
      buildNewShopDetails(req,shopDetails)
      let docs = await shopdetail.save()
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

function buildNewShopDetails(req,shopdetail){
    shopdetail.Name = req.body.Name || shopdetail.Name
    shopdetail.Address = req.body.Address || shopdetail.Address
    shopdetail.BranchName = req.body.BranchName || shopdetail.BranchName
}

module.exports.getAll = async(req,res)=>{
    try{
     const shopdetails = await shopDetails.find()
     res.status(wrapper.successCode).json({
         message:wrapper.successValue,
         value:shopdetails
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
      const shopdetails = await shopDetails.findById({_id:req.params.id})
      if(!shopdetails){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:shopdetails
      })
    }catch(err){
        res.status(wrapper.successCode).json({
            message:wrapper.successValue,
            error:err
        })
    }
}

module.exports.updateId = async(req,res)=>{
    try{
      const shopdetails = await shopDetails.findByIdAndUpdate({_id:req.params.id})
      if(!shopdetails){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      buildNewShopDetails(req,shopdetails)
      let docs = await shopdetails.save()
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:docs
      })
    }catch(err){
        res.status(wrapper.successCode).json({
            message:wrapper.successValue,
            error:err
        })
    }
}

module.exports.deleteId = async(req,res)=>{
    try{
      const shopdetails = await shopDetails.deleteOne({_id:req.params.id})
      if(!shopdetails){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              error:err
          })
      }
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:"message deleted"
      })
    }catch(err){
        res.status(wrapper.successCode).json({
            message:wrapper.successValue,
            error:err
        })
    }
}
