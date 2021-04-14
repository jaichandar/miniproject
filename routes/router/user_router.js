const express = require('express')
const router = express.Router()
const user_controller = require('../../controller/user.controller')


router.get('/getall',user_controller.getAll)
router.get('/getall/:id',user_controller.getById)
router.post('/create',user_controller.create)
router.put('/update/:id',user_controller.updateId)
router.delete('/delete/:id',user_controller.deleteId)



module.exports = router