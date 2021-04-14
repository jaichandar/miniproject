const SupplierStock = require('../models/supplierstockdetails.model')
const wrapper = require('../constraints/wrapper/wrapper')

module.exports.create = async(req,res)=>{
    try{ 
     const supplier = await SupplierStock()
     buildNewSupplierStock(req,supplier)
     let docs = await SupplierStock.save()
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

function buildNewSupplierStock(req,supplier){
    supplier.SupplierdetailsId = req.body.SupplierdetailsId || supplier.SupplierdetailsId
    supplier.BillNumber = req.body.BillNumber || supplier.BillNumber
    supplier.TotalBillAmount = req.body.TotalBillAmount || supplier.TotalBillAmount
    supplier.Balance = req.body.Balance || supplier.Balance
    supplier.SupplierStockDetailsId = req.body.SupplierStockDetailsId || supplier.SupplierStockDetailsId
}

module.exports.getAll = async(req,res)=>{
    try{
      const supplier = await SupplierStock.find()
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:supplier
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
      const supplier = await SupplierStock.findById({_id:req.params.id})
      if(!supplier){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:supplier
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
        const supplier = await SupplierStock.findByIdAndUpdate({_id:req.params.id})
     if(!supplier){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      buildNewSupplierStock(req,supplier)
      let docs = await supplier.save()
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
     const supplier = await SupplierStock.deleteOne({_id:req.params.id})
     if(!supplier){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:supplier
      })
    }catch(err){
        res.status(wrapper.failureCode).json({
            message:wrapper.failureValue,
            error:err
        })
    }
}
