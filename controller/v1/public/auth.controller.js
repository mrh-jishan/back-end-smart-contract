'use strict';

const userService = require("../../../services/user/user.service");

const register = (req, res, next) => {
    userService.createUser(req.body).then(data => {
        res.body = {
            data: data,
            message: 'SUCCESS'
        };
        next();
    });

};

const login = (req, res, next) => {
    res.body = {
        data: {},
        message: 'success'
    };
    next()
}

module.exports = {
    register,
    login
}
