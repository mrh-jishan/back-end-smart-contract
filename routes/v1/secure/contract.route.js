'use strict';
let router = require('express').Router();
const contract = require('../../../controller/v1/secure/contract.controller');
const validators = require('../../../validators/v1/contract.validator')

// /api/v1/secure
router.post('/contract/create', validators.validateCreateContract, contract.create);
router.get('/contract/all', contract.fetch);
router.post('/contract/deploy', contract.deploy);


module.exports = router;
