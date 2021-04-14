const express = require('express')
const router = express.Router()
const supplierStockDetails_controller = require('../../controller/supplierstockdetails.controller')


router.get('/getall',supplierStockDetails_controller.getAll)
router.get('/getall/:id',supplierStockDetails_controller.getById)
router.post('/create',supplierStockDetails_controller.create)
router.put('/update/:id',supplierStockDetails_controller.updateId)
router.delete('/delete/:id',supplierStockDetails_controller.deleteId)


module.exports = router