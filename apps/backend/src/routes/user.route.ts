const express = require('express')
const router = express.Router()
const {addUser, getUser} = require("../controller/user.controller")

router.post('/', addUser)
router.get('/', getUser)

module.exports = router