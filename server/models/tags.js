const { randomUUID } = require('crypto')
const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: randomUUID,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        type: {
            type: String,
            enum: ['skill', 'service', 'interest'],
            required: true,
        },
    },
    {
        collection: 'tags',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: false,
        },
    }
)

module.exports = mongoose.model('Tag', tagSchema)
