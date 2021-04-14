const express = require('express')
const router = express.Router()
const supplierDetails_controller = require('../../controller/supplierdetails.controller')

router.get('/getall',supplierDetails_controller.getAll)
router.get('/getall/:id',supplierDetails_controller.getById)
router.post('/create',supplierDetails_controller.create)
router.put('/update/:id',supplierDetails_controller.updateId)
router.delete('/delete/:id',supplierDetails_controller.deleteId)



module.exports = router