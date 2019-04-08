'use strict';

require('../db/mongo/schemas/auth.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'), Auth = mongoose.model('Auth');


const create = (config = {}) => {
    return new Promise((resolve, reject) => {
        let newAuth = new Auth(config);
        newAuth.save((err, doc) => err ? reject(err) : resolve(doc));
    });
};


module.exports = {
    create
};
