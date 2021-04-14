const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    roleType:{type:String,required:true},
    description:{type:String,required:true}
})

const Model = mongoose.model('roletype',roleSchema)
module.exports = Model;
