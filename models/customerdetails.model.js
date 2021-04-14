const mongoose = require('mongoose')

const customerDetailsSchema = mongoose.Schema({
    CustomerName:{
        type:String,
        required:true
    },
    CustomerPhoneNumber:{type:Number,requried:true,unique:true},
    CustomerPlace:{type:String,required:true}
})

const Model = mongoose.model('customerdetail',customerDetailsSchema)
module.exports = Model