const express = require('express')
const router = express.Router()
const customerdetails_controller = require('../../controller/customerdetails.controller')


router.get('/getall',customerdetails_controller.getAll)
router.get('/getall/:id',customerdetails_controller.getById)
router.post('/create',customerdetails_controller.create)
router.put('/update/:id',customerdetails_controller.updateId)
router.delete('/delete/:id',customerdetails_controller.deleteId)


module.exports = router