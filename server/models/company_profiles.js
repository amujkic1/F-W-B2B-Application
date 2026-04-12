const { randomUUID } = require('crypto')
const mongoose = require('mongoose')

const companyProfileSchema = new mongoose.Schema(
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
        company_name: {
            type: String,
            required: true,
            trim: true,
        },
        industry_id: {
            type: String,
            ref: 'Industry',
            default: null,
        },
        description: {
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
        address: {
            type: String,
            default: null,
        },
        website_url: {
            type: String,
            default: null,
        },
        logo_url: {
            type: String,
            default: null,
        },
        company_size: {
            type: String,
            enum: ['1-10', '11-50', '51-200', '201+'],
            required: true,
        },
        looking_for: {
            type: String,
            enum: ['clients', 'partners', 'suppliers', 'talent', 'networking'],
            default: null,
        },
    },
    {
        collection: 'company_profiles',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

module.exports = mongoose.model('CompanyProfile', companyProfileSchema)
