'use strict';
var langs = require('../langs');
const fs = require('fs');
module.exports = function (req, res, next) {
    // res.body.errors = res.body.errors || [];
    // if(res.body && (Object.keys(res.body.data).length || Object.keys(res.body.errors).length) )
    // if (req.files) {
    //   Object.keys(req.files).forEach(fileKey => {
    //     if (Array.isArray(req.files[fileKey])) {
    //       req.files[fileKey].forEach(f => {
    //         fs.unlink(f.path);
    //       })
    //     } else {
    //       fs.unlink(req.files[fileKey].path);
    //     }
    //   })
    // }
    if (res.body) {
        let response = {};
        response.data = res.body.data || {};
        response.errors = res.body.errors || [];
        response.success = !Object.keys(response.errors).length;
        if (response.success) {
            delete response.errors;
        }
        var message = langs[req.query.lang || 'en-us'][response.success ? 'success' : 'errors'][res.body.message || 'CUSTOM_MESSAGE'];
        // console.log(langs[req.query.lang || 'en-us'][response.success ? 'success' : 'errors']);
        // console.log("M", message);
        try {
            response.message = message.message;
            response.status = message.code || 200;
        } catch (err) {
            response.status = 401;
        }
        res.status(response.status).send(response);
    } else {
        let response = {};
        response.err = "UNAUTHORIZED";
        response.data = {};
        response.code = 401;
        res.status(401).send(response);
    }
}