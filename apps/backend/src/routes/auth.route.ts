const express = require('express')
const router = express.Router()
const {login, logout, me, validateRefresh} = require('../controller/auth.controller')

router.post('/', login)
router.get('/me', me)
router.get('/', logout)
router.get('/refresh', validateRefresh)

module.exports = router