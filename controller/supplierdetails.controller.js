const Supplier = require('../models/supplierdetails.model')
const wrapper = require('../constraints/wrapper/wrapper')

module.exports.create = async(req,res)=>{
    try{
        const supplier = await Supplier()
        buildNewSupplierDetails(req,supplier)
        let docs = await supplier.save()
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

function buildNewSupplierDetails(req,supplier){
    supplier.Name = req.body.Name || supplier.Name
    supplier.Address = req.body.Address || supplier.Address
    supplier.ContactPerson = req.body.ContactPerson || supplier.ContactPerson
    supplier.ContactPerson2 = req.body.ContactPerson2 || supplier.ContactPerson2
    supplier.PhoneNumber = req.body.PhoneNumber || supplier.PhoneNumber
    supplier.PhoneNumber2 = req.body.PhoneNumber2 || supplier.PhoneNumber2
    supplier.PhoneNumber3 = req.body.PhoneNumber3 || supplier.PhoneNumber3
    supplier.SupplierDetailsId = req.body.SupplierDetailsId || supplier.SupplierDetailsId
}

module.exports.getAll = async(req,res)=>{
    try{
     const supplier = await Supplier.find()
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
      const supplier = await Supplier.findById({_id:req.params.id})
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
      const supplier = await Supplier.findByIdAndUpdate({_id:req.params.id})
      if(!supplier){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      buildNewSupplierDetails(req,supplier)
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
      const supplier = await Supplier.deleteOne({_id:req.params.id})
      if(!supplier){
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
