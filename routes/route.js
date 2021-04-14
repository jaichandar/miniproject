const express = require('express')
const app = express.Router()
const routers = require('./router');
const auth = require('../constraints/wrapper/verifytoken');


app.use('/role',routers.role_controller)
app.use('/user',routers.user_controller)
app.use('/supplierdetails',routers.supplierdetails_controller)
app.use('/supplierstockdetails',routers.supplierstockdetails_controller)
app.use('/shopdetails',routers.shopdetails_controller)
app.use('/register',routers.auth_controller)
app.use('/login',routers.login_controller)
app.use('/stockdetails',routers.stockdetails_controller)
app.use('/brand',routers.brand_controller)
app.use('/selesdetails',routers.salesdetails_controller)
app.use('/customerdetails',routers.customerdetails_controller)


module.exports = app