const { randomUUID } = require('crypto')
const mongoose = require('mongoose')

const meetingRequestSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: randomUUID,
        },
        requester_user_id: {
            type: String,
            ref: 'User',
            required: true,
        },
        recipient_user_id: {
            type: String,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: null,
        },
        meeting_type: {
            type: String,
            enum: ['online', 'offline'],
            required: true,
        },
        location_text: {
            type: String,
            default: null,
        },
        meeting_link: {
            type: String,
            default: null,
        },
        requested_start_at: {
            type: Date,
            required: true,
        },
        requested_end_at: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'cancelled', 'completed'],
            default: 'pending',
            required: true,
        },
        note_from_requester: {
            type: String,
            default: null,
        },
        note_from_recipient: {
            type: String,
            default: null,
        },
    },
    {
        collection: 'meeting_requests',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

meetingRequestSchema.index({ requester_user_id: 1, requested_start_at: 1 })
meetingRequestSchema.index({ recipient_user_id: 1, requested_start_at: 1 })

module.exports = mongoose.model('MeetingRequest', meetingRequestSchema)
