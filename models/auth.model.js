const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    date:{type:Date,default:Date.now}
})

const Model = mongoose.model('register',registerSchema)
module.exports = Model