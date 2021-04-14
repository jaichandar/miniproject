const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    BrandName:{type:String,requried:true},
    Description:{type:String,requried:true},
    ProductDetailsId:{type:Number,required:true}
})

const Model = mongoose.model('brand',brandSchema)
module.exports = Model