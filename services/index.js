'use strict';


const auth = require('./auth/auth.service');
const user = require('./user/user.service');
const contract = require('./contract/contract.service');

module.exports = {
    auth,
    user,
    contract
}
