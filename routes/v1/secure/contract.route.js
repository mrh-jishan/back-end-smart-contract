'use strict';
let router = require('express').Router();
const contract = require('../../../controller/v1/secure/contract.controller');

// /api/v1/secure
router.post('/contract/deploy', contract.deploy);
router.get('/contract/deploy', contract.fetch);


module.exports = router;
