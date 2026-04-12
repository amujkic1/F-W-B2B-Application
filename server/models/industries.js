const { randomUUID } = require('crypto')
const mongoose = require('mongoose')

const industrySchema = new mongoose.Schema(
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
    },
    {
        collection: 'industries',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: false,
        },
    }
)

module.exports = mongoose.model('Industry', industrySchema)
