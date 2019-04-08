'use strict';
let router = require('express').Router();
const authentication = require('../../controller/v1/authentication.controller');

router.post('/register', authentication.register);
router.post('/login', authentication.login);


module.exports = router;
