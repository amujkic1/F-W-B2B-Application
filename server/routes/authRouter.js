const express = require('express')
const Company = require('../models/company')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router