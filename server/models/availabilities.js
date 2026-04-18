const { randomUUID } = require('crypto')
const mongoose = require('mongoose')

const availabilitiesSchema = new mongoose.Schema(
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
        day_of_week: {
            type: Number,
            required: true,
            min: 0,
            max: 6,
        },
        start_time: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        },
        end_time: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        },
        is_active: {
            type: Boolean,
            default: true,
            required: true,
        },
    },
    {
        collection: 'availabilities',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

availabilitiesSchema.index({ user_id: 1, day_of_week: 1, start_time: 1, end_time: 1 })

module.exports = mongoose.model('Availability', availabilitiesSchema)
