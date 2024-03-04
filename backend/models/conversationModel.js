const mongoose = require('mongoose');
const User = require('./userModel')
const conversationSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: User,
            require: true
        }
    ]

}, { timestamps: true }, { strict: true })

const Conversation = mongoose.model("Conversation", conversationSchema)

module.exports = Conversation