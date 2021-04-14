const express = require('express')
const router = express.Router()
const login_controller = require('../../controller/auth.controller')

router.post('/',login_controller.login)



module.exports = router