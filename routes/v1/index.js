'use strict';
var responseHandler = require('../../middlewares/responseHandler');
const contractRoute = require('./contract.route');
const auth = require('./auth.route');


module.exports = app => {

    /* API list*/
    app.use('/api/v1/secure', contractRoute, responseHandler);
    app.use('/api/v1/public', auth, responseHandler);

    /**
     * Always keep this route at last
     */
    app.use('*', function (req, res, next) {
        console.log("NO ROUTE MATCH");
        next({err: 'NO_API_FOUND'});
    });
    return app;
}
