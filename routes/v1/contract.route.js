'use strict';
let router = require('express').Router();
const contract = require('../../controller/v1/contract.controller');

router.post('/contract/deploy', contract.deploy);
router.get('/contract/deploy', contract.fetch);


module.exports = router;
