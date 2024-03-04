const mongoose = require('mongoose');
const Conversation = require('./conversationModel');
const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.ObjectId,
        ref: Conversation
    },
    to: {
        type: String,
        required: true
    },
    by: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }

}, { timestamps: true }, { strict: true })

const Message = mongoose.model("Message", messageSchema)

module.exports = Message