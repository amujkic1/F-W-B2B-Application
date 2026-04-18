const { randomUUID } = require('crypto')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: randomUUID,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password_hash: {
            type: String,
            required: true,
        },
        account_type: {
            type: String,
            enum: ['individual', 'company'],
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'blocked'],
            default: 'active',
            required: true,
        },
        email_verified_at: {
            type: Date,
            default: null,
        },
    },
    {
        collection: 'users',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

module.exports = mongoose.model('User', userSchema)
