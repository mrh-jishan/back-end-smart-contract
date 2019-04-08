'use strict';

require('../db/mongo/schemas/user.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'), User = mongoose.model('User');


const create = (config = {}) => {
    return new Promise((resolve, reject) => {
        let newUser = new User(config);
        newUser.save((err, doc) => err ? reject(err) : resolve(doc));
    });
};
const read = (query, options = {}) => {
    return new Promise((resolve, reject) => {
        if (options.multi) {
            User.find(query)
                .skip(options.skip || 0)
                .limit(options.limit || 0)
                .exec((err, Contract) => err ? reject(err) : resolve(Contract))
        } else {
            User.findOne(query)
                .exec((err, Contract) => err ? reject(err) : resolve(Contract))
        }
    });
};
const update = (query, update, options = {}) => {
    options = _.extend(options, {upsert: false, runValidators: true});
    return new Promise((resolve, reject) => {
        User.update(query, update, options)
            .exec((err, doc) => err ? reject(err) : resolve(doc));
    });
};
const deleteUser = (query) => {
    return new Promise((resolve, reject) => {
        User.remove(query, (err, Contract) => err ? reject(err) : resolve(Contract));
    });
};
const count = (query = {}) => {
    return new Promise((resolve, reject) => {
        User.count(query, (err, count) => err ? reject(err) : resolve(count));
    })
};


module.exports = {
    create,
    read,
    update,
    deleteUser,
    count
};
