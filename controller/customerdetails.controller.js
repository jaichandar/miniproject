const Customer = require('../models/customerdetails.model')
const wrapper = require('../constraints/wrapper/wrapper')

module.exports.create = async(req,res)=>{
    try{
        const customer = await Customer()
        buildNewCustomer(req,customer)
        let docs = await customer.save()
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

function buildNewCustomer(req,customer){
    customer.CustomerName = req.body.CustomerName || customer.CustomerName
    customer.CustomerPhoneNumber = req.body.CustomerPhoneNumber || customer.CustomerPhoneNumber
    customer.CustomerPlace = req.body.CustomerPlace || customer.CustomerPlace
}

module.exports.getAll = async(req,res)=>{
    try{
     const customer = await Customer.find()
     res.status(wrapper.successCode).json({
         message:wrapper.successValue,
         value:customer
     })
    }catch(err){
        res.status(wrapper.successCode).json({
            message:wrapper.successValue,
            error:err
        })
    }
}

module.exports.getById = async(req,res)=>{
    try{
      const customer = await Customer.findById({_id:req.params.id})
      if(!customer){
          return res.status(wrapper.notfoundCode).json({
              message:wrapper.notFound,
              value:'invalid credentials'
          })
      }
      res.status(wrapper.successCode).json({
          message:wrapper.successValue,
          value:customer
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
     const customer = await Customer.findByIdAndUpdate({_id:req.params.id})
     if(!customer){
         return res.status(wrapper.notfoundCode).json({
             message:wrapper.notFound
         })
     }
    buildNewCustomer(req,customer)
    let docs = await customer.save()
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
     const customer = await Customer.deleteOne({_id:req.params.id})
     if(!customer){
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