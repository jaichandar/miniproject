const express = require('express')
const router = express.Router()
const role_controller = require('../../controller/role.controller')
const auth = require('../../constraints/wrapper/verifytoken');

router.get('/getall',role_controller.getAll)
router.get('/getall/:id',role_controller.getById)
router.post('/create',role_controller.create)
router.put('/update/:id',role_controller.updateId)
router.delete('/delete/:id',role_controller.deleteId)




module.exports = router