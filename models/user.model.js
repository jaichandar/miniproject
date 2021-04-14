const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    PhoneNumber:{type:Number,requried:true},
    City:{type:String,requried:true},
    roleType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'role',
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

const Model = mongoose.model('user',userSchema)
module.exports = Model