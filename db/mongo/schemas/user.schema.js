'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        name: {
            type: String
        },
        email: {
            type: email
        },
        password: {
            type: String
        },
        role: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    });


module.exports = mongoose.model('User', userSchema);
