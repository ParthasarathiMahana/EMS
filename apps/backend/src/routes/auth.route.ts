const express = require('express')
const router = express.Router()
const {login, logout} = require('../controller/auth.controller')

router.post('/', login)
router.get('/', logout)

module.exports = router