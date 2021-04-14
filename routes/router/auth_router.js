const express = require('express')
const router = express.Router()

const auth_controller = require('../.././controller/auth.controller');
const Auth = require('../../constraints/wrapper/verifytoken');

router.post('/',Auth, auth_controller.create)



module.exports = router