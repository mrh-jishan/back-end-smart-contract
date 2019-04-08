'use strict';

const bcrypt = require('bcrypt');
const models = require('../../models');

const createUser = (config) => new Promise((resolve, reject) => {
    const hashed_password = bcrypt.hashSync(config.password, 10);
    const user = {name: config.name, email: config.email, password: hashed_password, role: 'client'}
    models.User.create(user).then(res => resolve(res), err => reject(err));
});


module.exports = {
    createUser
};
