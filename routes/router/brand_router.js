const express = require('express')
const router = express.Router()
const brand_controller = require('../../controller/brand.controller')
const Auth = require('../../constraints/wrapper/verifytoken');


router.get('/getall',Auth,brand_controller.getAll)
router.get('/getall/:id',Auth,brand_controller.getById)
router.post('/create',Auth,brand_controller.create)
router.put('/update/:id',Auth,brand_controller.updateId)
router.delete('/delete/:id',Auth,brand_controller.deleteId)



module.exports = router