const mongoose = require('mongoose')

const productDetailsSchema = new mongoose.Schema({
    ProductName:{type:String,required:true},
    ProductType:{type:String,required:true},
    ProductCategory:{type:String,required:true},
    Quantity:{type:Number,default:0},
    Count:{type:Number,default:0},
    Size:{type:Number,default:0},
    Type:{type:String,required:true},
    SupplierId:{type:Number,required:true},
    CostPrice:{type:Number,default:0},
    CostPrice:{type:Number,default:0},
    sellingPrice:{type:Number,default:0},
    date:{
        type:Date,
        default:Date.now
    }
})

const Model = mongoose.model('productdetail',productDetailsSchema)
module.exports = Model