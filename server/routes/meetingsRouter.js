const express = require('express')
const router = express.Router()
const meetingsController = require('../controllers/meetingsController')

router.post('/schedule', meetingsController.scheduleMeeting)

module.exports = router