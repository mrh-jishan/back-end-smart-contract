'use strict';
require('../db/mongo/schemas/contract.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'), Contract = mongoose.model('Contract');


const create = (config = {}) => {
    return new Promise((resolve, reject) => {
        let newContract = new Contract(config);
        newContract.save((err, doc) => err ? reject(err) : resolve(doc));
    });
};


const read = (query, options = {}) => {
    return new Promise((resolve, reject) => {
        if (options.multi) {
            Contract.find(query)
                .skip(options.skip || 0)
                .limit(options.limit || 0)
                .exec((err, Contract) => err ? reject(err) : resolve(Contract))
        } else {
            Contract.findOne(query)
                .exec((err, Contract) => err ? reject(err) : resolve(Contract))
        }
    });
};

const update = (query, update, options = {}) => {
    options = _.extend(options, {upsert: false, runValidators: true});
    return new Promise((resolve, reject) => {
        Contract.update(query, update, options)
            .exec((err, doc) => err ? reject(err) : resolve(doc));
    });
};

const deleteContract = (query) => {
    return new Promise((resolve, reject) => {
        Contract.remove(query, (err, Contract) => err ? reject(err) : resolve(Contract));
    });
};


const count = (query = {}) => {
    return new Promise((resolve, reject) => {
        Contract.count(query, (err, count) => err ? reject(err) : resolve(count));
    })
};

module.exports = {
    create,
    read,
    update,
    deleteContract,
    count
};
