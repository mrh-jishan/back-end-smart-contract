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
            type: email
        },
        accessTokenExp: {
            type: String
        },
        refreshToken: {
            type: String
        }, refreshTokenExp: {
            type: email
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
