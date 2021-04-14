const mongoose = require('mongoose')

const supplierStockDetailsSchema = new mongoose.Schema({
    supplierDetailsId:{
        type:String,
        required:true
    },
    BillNumber:{type:Number,required:true},
    TotalBillAmount:{type:Number,required:true},
    Balance:{type:Number,required:true},
    SupplieStockDetailsId:{type:Number,required:true}
})
const Model = mongoose.model('supplierstockdetail',supplierStockDetailsSchema)
module.exports = Model