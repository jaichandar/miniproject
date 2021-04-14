const express = require('express')
const router = express.Router()
const salesdetails_controller = require('../../controller/salesdetails.controller')

router.get('/getall',salesdetails_controller.getAll)
router.get('/getall/:id',salesdetails_controller.getById)
router.post('/create',salesdetails_controller.create)
router.put('/update/:id',salesdetails_controller.updateId)
router.delete('/delete/:id',salesdetails_controller.deleteId)




module.exports = router