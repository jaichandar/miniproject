const salesDetails = require('../models/salesdetails.model')
const wrapper = require('../constraints/wrapper/wrapper')


module.exports.create = async(req,res)=>{
    try{
     const saledetails = await salesDetails()
     buildNewSalesDetails(req,saledetails)
     let docs = await saledetails.save()
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

function buildNewSalesDetails(req,saledetails){
    saledetails.SalesId = req.body.SalesId || saledetails.SalesId
    saledetails.ProductId = req.body.ProductId || salesDetails.ProductId
    saledetails.ProductPrice = req.body.ProductPrice || saledetails.ProductPrice
    saledetails.Quantity = req.body.Quantity || saledetails.Quantity
    saledetails.Discount = req.body.Discount || saledetails.Discount
    saledetails.SellingPrice = req.body.SellingPrice || saledetails.SellingPrice
    saledetails.CustomerId = req.body.CustomerId || saledetails.CustomerId
    saledetails.Payment = req.body.Payment || saledetails.Payment
    saledetails.IfCredit = req.body.IfCredit || saledetails.IfCredit
    saledetails.IfCash = req.body.IfCash || saledetails.IfCash
    saledetails.Date = req.body.Date || saledetails.Date
}

module.exports.getAll = async(req,res)=>{
    try{
      const saledetails = await salesDetails.find()
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:saledetails
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
     const saledetails = await salesDetails.findById({_id:req.params.id})
     if(!saledetails){
         return res.status(wrapper.notfoundCode).json({
             message:wrapper.notFound,
             value:'invalid credentials'
         })
     }
     res.status(wrapper.successCode).json({
         message:wrapper.successValue,
         value:saledetails
     })
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureCode,
            value:'invalid credentials'
        })
    }
}

module.exports.updateId = async(req,res)=>{
    try{
      const saledetails = await salesDetails.findByIdAndUpdate({_id:req.params.id})
      if(!saledetails){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound
          })
      }
      buildNewSalesDetails(req,saledetails)
      let docs = await saledetails.save()
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
      const saledetails = await salesDetails.deleteOne({_id:req.params.id})
      if(!saledetails){
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
