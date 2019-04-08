'use strict';
let router = require('express').Router();
const authentication = require('../../../controller/v1/public/auth.controller');

// /api/v1/public
router.post('/register', authentication.register);
router.post('/login', authentication.login);


module.exports = router;
