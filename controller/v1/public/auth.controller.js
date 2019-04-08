'use strict';

const service = require("../../../services");

const register = (req, res, next) => {
    service.user.createUser(req.body).then(res => {
        res.body = {
            data: {},
            message: 'SUCCESS'
        };
        next();
    });

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
