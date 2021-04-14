const mongoose = require('mongoose')

const salesDetailsSchema = mongoose.Schema({
    salesId:{type:String,required:true},
    productId:{type:String,requird:true},
    ProductPrice:{type:Number,default:0},
    Quantity:{type:Number,default:0},
    Discount:{type:Number},
    SellingPrice:{
        type:Number,
        default:0
    },
    CustomerId:{type:Number,default:0},
    Payment:{
        enum:['cash','credit'],
    },
    IfCredit:{
        enum:['paid','balance']
    },
    IfCash:{
        enum:['full','half']
    },
    dueDate:{
        type:Date
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const Model = mongoose.model('salesdetail',salesDetailsSchema)
module.exports = Model