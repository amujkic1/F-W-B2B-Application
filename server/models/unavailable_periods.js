const { randomUUID } = require('crypto')
const mongoose = require('mongoose')

const unavailablePeriodSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: randomUUID,
        },
        user_id: {
            type: String,
            ref: 'User',
            required: true,
        },
        start_datetime: {
            type: Date,
            required: true,
        },
        end_datetime: {
            type: Date,
            required: true,
        },
        reason: {
            type: String,
            default: null,
        },
    },
    {
        collection: 'unavailable_periods',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: false,
        },
    }
)

unavailablePeriodSchema.index({ user_id: 1, start_datetime: 1, end_datetime: 1 })

module.exports = mongoose.model('UnavailablePeriod', unavailablePeriodSchema)
