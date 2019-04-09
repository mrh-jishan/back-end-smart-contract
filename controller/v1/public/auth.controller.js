'use strict';

const bcrypt = require('bcrypt');
const service = require('./../../../services');
const model = require('../../../models')

const register = (req, res, next) => {

    service.user.createUser(req.body).then(data => {
        res.body = {
            data: data,
            message: 'SUCCESS'
        };
        next();
    });
};

const login = (req, res, next) => {
    model.User.read({email: req.body.email}).then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                service.auth.generateToken(req.body).then(token => {
                    console.log('--------token-------------',token);
                    res.body = {
                        data: token,
                        message: 'success'
                    };
                    next()
                })
            } else {
                next({'err': 'ACC_DENIED'});
            }

        } else {
            next({'err': 'ACC_DENIED'})
        }
    });
}

module.exports = {
    register,
    login
}
