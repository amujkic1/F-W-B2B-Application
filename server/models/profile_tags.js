const { randomUUID } = require('crypto')
const mongoose = require('mongoose')

const profileTagSchema = new mongoose.Schema(
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
        tag_id: {
            type: String,
            ref: 'Tag',
            required: true,
        },
    },
    {
        collection: 'profile_tags',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: false,
        },
    }
)

profileTagSchema.index({ user_id: 1, tag_id: 1 }, { unique: true })

module.exports = mongoose.model('ProfileTag', profileTagSchema)
