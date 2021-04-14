const express = require('express')
const router = express.Router()
const shopdetails_controller = require('../../controller/shopdetails.controller')

router.get('/getall',shopdetails_controller.create)
router.get('/getall/:id',shopdetails_controller.getById)
router.post('/create',shopdetails_controller.create)
router.put('/update/:id',shopdetails_controller.updateId)
router.delete('/delete/:id',shopdetails_controller.deleteId)


module.exports = router