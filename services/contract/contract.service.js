'use strict';

const models = require('../../models');

const createContract = (config) => new Promise((resolve, reject) => {
    const contract = {data: config.data}
    models.Contract.create(contract).then(res => resolve(res))
        .catch(reject);
});


const fetchContract = (config) => new Promise((resolve, reject) => {
    let total;
    models.Contract.count({}).then(count => {
        console.log('-------------count-----------',count)
        total = count;
        return models.Contract.read({}, {
            multi: true,
            skip: Number(config.skip),
            limit: Number(config.limit)
        });
    }).then(res => resolve({
        list: res,
        total: total,
        skip: Number(config.skip),
        limit: Number(config.limit)
    }))
        .catch(reject)
});


module.exports = {
    createContract,
    fetchContract
};
