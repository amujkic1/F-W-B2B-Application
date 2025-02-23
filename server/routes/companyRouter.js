const express = require('express')
const router = express.Router()
const companyController = require('../controllers/companyController')

router.get('/companies', companyController.getAllCompanies)
router.post('/company', companyController.findCompanyByEmail)

module.exports = router