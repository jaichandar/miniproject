const mongoose = require('mongoose')

const shopDetailsSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    Address:{type:String,required:true},
    BranchName:{type:String,required:true}
})

const Model = mongoose.model('shopdetail',shopDetailsSchema)
module.exports = Model