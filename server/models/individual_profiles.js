const { randomUUID } = require('crypto')
const mongoose = require('mongoose')

const individualProfileSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: randomUUID,
        },
        user_id: {
            type: String,
            ref: 'User',
            required: true,
            unique: true,
        },
        first_name: {
            type: String,
            required: true,
            trim: true,
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
        },
        headline: {
            type: String,
            default: null,
        },
        bio: {
            type: String,
            default: null,
        },
        city: {
            type: String,
            default: null,
        },
        country: {
            type: String,
            default: 'BiH',
        },
        profile_image_url: {
            type: String,
            default: null,
        },
        looking_for: {
            type: String,
            enum: ['client', 'job', 'partner', 'networking'],
            default: null,
        },
    },
    {
        collection: 'individual_profiles',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

module.exports = mongoose.model('IndividualProfile', individualProfileSchema)
