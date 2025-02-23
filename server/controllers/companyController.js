const Company = require('../models/company')

async function getAllCompanies(req, res) {

    try{
        const companies = await Company.find({})
        res.status(200).json({companies})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function findCompanyByEmail(req, res) {

    const { email } = req.body

    try {
        const company = await Company.findOne({registrationEmail: email})
        res.status(200).json({company})        
    }catch(err){
        res.status(500).json({error: err.message})
    }
    
}

module.exports = {
    getAllCompanies,
    findCompanyByEmail
}