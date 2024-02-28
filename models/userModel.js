const { profile } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true

    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        require: false
    }
}, { strict: true })

const User = mongoose.model("User", userSchema)

module.exports = User