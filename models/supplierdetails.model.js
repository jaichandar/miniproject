const mongoose = require('mongoose')

const SupplierDetailsSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    Address:{type:String,required:true},
    ContactPerson:{type:Number,required:true},
    ContactPerson2:Number,
    PhoneNumber:{type:Number,required:true},
    PhoneNumber2:Number,
    PhoneNumber3:Number,
    SupplierDetailsId:Number
})

const Model = mongoose.model('supplierdetail',SupplierDetailsSchema)
module.exports = Model