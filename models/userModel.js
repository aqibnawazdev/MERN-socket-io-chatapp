const { profile } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required..."],
        unique: [true, "User name already exists"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid']

    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required..."],
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
        },
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        require: false
    }

}, { timestamps: true }, { strict: true })

const User = mongoose.model("User", userSchema)

module.exports = User