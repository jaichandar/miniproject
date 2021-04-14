const express = require('express')
const router = express.Router()
const stockdetails_controller = require('../../controller/shockdetails.controller')


router.get('/getall',stockdetails_controller.getAll)
router.get('/getall/:id',stockdetails_controller.getById)
router.post('/create',stockdetails_controller.create)
router.put('/update/:id',stockdetails_controller.updateId)
router.delete('/delete/:id',stockdetails_controller.deleteId)



module.exports = router