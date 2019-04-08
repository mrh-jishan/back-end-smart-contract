'use strict';

const deploy = (req, res, next) => {
    res.body = {
        data: {},
        'message': 'SUCCESS'
    };

    next()
};

const fetch = (req, res, next) => {
    res.body = {
        data: {},
        message: 'success'
    }
    next()
}

module.exports = {
    deploy,
    fetch
}
