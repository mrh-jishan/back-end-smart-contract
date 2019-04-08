'use strict';

const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
        userId: {
            type: String
        },
        role: {
            type: String
        },
        accessToken: {
            type: String
        },
        accessTokenExp: {
            type: String
        },
        refreshToken: {
            type: String
        },
        refreshTokenExp: {
            type: String
        },
        valid: {
            type: String
        },
        refreshTokenCount: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    });


module.exports = mongoose.model('Auth', authSchema);
