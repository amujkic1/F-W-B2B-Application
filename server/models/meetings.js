const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new Schema({
    timeDate: {
        type: Date,
        required: true
    },
    companyA: {
        type: String,
        required: true
    },
    companyB: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Meeting', meetingSchema);