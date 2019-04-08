'use strict';

const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
        text: {
            type: String
        },
        contractAddress: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    });


module.exports = mongoose.model('Contract', contractSchema);
