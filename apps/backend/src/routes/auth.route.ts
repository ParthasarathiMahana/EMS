const express = require('express')
const router = express.Router()
const {login, logout, me} = require('../controller/auth.controller')

router.post('/', login)
router.get('/me', me)
router.get('/', logout)

module.exports = router