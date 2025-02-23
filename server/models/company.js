const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    company: {
        type: String,
        required: true, 
    },
    id: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    officialEmail: {
        type: String,
        required: false,
    },
    registrationEmail: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Company', companySchema);