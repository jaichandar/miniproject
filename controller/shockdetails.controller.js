const stockDetails = require('../models/stockdetails.model')
const wrapper = require('../constraints/wrapper/wrapper')

module.exports.create = async(req,res)=>{
    try{
      const stockdetais = await stockDetails()
      buildNewStockDetails(req,stockDetails)
      let docs = await stockDetails.save()
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

function buildNewStockDetails(req,stockdetails){
    stockdetails.ProductName = req.body.ProductName || stockdetails.ProductName
    stockdetails.ProductType = req.body.ProductType || stockdetails.ProductType
    stockdetails.ProductCategory = req.body.ProductCategory || stockdetails.ProductCategory
    stockdetails.Quantity = req.body.Quantity || stockdetails.Quantity
    stockdetails.Count = req.body.Count || stockdetails.Count
    stockdetails.Size = req.body.Size || stockdetails.Size
    stockdetails.Type = req.body.Type || stockdetails.Type
    stockdetails.SupplierId = req.body.supplierId || stockdetails.supplierId
    stockdetails.CostPrice = req.body.CostPrice || stockdetails.CostPrice
    stockdetails.SellingPrice = req.body.SellingPrice || stockdetails.SellingPrice
}

module.exports.getAll = async(req,res)=>{
    try{
      const stockdetails = await stockDetails.find()
      res.status(wrapper.successCode).json({
          messahe:wrapper.successValue,
          value:stockdetails
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
      const stockdetails = await stockDetails({_id:req.params.id})
      if(!stockdetails){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:stockdetails
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
     const stockdetails = await stockDetails.findByIdAndUpdate({_id:req.params.id})
     if(!stockdetails){
         return res.status(wrapper.failureCode).json({
             message:wrapper.failureCode,
             value:"invalid credentials"
         })
     }
     buildNewStockDetails(req,stockdetails)
     let docs = await stockdetails.save()
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
      const stockdetails = await stockDetails.deleteOne({_id:req.params.id})
      if(!stockdetails){
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
