'use strict';

const register = (req, res, next) => {
    res.body = {
        data: {},
        'message': 'SUCCESS'
    };

    next()
};

const login = (req, res, next) => {
    res.body = {
        data: {},
        message: 'success'
    }
    next()
}

module.exports = {
    register,
    login
}
