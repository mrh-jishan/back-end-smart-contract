'use strict';
const service = require('./../../../services');

const create = (req, res, next) => {
    service.contract.createContract(req.body).then(contract => {
        if (contract) {
            res.body = {
                data: contract,
                'message': 'SUCCESS'
            };
            next()
        } else {
            next({'err': 'INTERNAL_ERROR'})
        }

    })
};

const fetch = (req, res, next) => {
    service.contract.fetchContract({
        skip: req.query.skip && !isNaN(req.query.skip) ? Number(req.query.skip) : 0,
        limit: req.query.limit && !isNaN(req.query.limit) ? Number(req.query.limit) : 0
    }).then(contract => {
        if (contract) {
            res.body = {
                data: contract,
                'message': 'SUCCESS'
            };
            next()
        } else {
            next({'err': 'INTERNAL_ERROR'})
        }

    })
        .catch(next)
}

const deploy = (req, res, next) => {
    res.body = {
        data: {},
        'message': 'SUCCESS'
    };

    next()
};

module.exports = {
    deploy,
    fetch,
    create
}
