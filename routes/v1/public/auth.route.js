'use strict';

let router = require('express').Router();
const validator = require("../../../validators/v1")
const authentication = require('../../../controller/v1/public/auth.controller');

// /api/v1/public
router.post('/register', validator.user.validateRegisterData, validator.user.validateEmail, authentication.register);
router.post('/login', validator.user.validateLoginData, authentication.login);


module.exports = router;
