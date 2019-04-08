'use strict'

var exports;
var langs = require('../langs');
const fs = require('fs');

module.exports = function (err, req, res, next) {
    console.log("in handler", err);
    if (req.files && Object.keys(req.files).length) {
        Object.keys(req.files).forEach(fileKey => {
            if (Array.isArray(req.files[fileKey])) {
                req.files[fileKey].forEach(f => {
                    if (fs.existsSync(f.path)) {
                        fs.unlink(f.path);
                    }
                })
            } else {
                if (fs.existsSync(req.files[fileKey].path)) {
                    fs.unlink(req.files[fileKey].path);
                }
            }
        })
    }
    let message;
    let errorTitle = err.message || err.err;
    if (errorTitle) {
        message = langs[req.query.lang || 'en-us']['errors'][err.message || err.err] || errorTitle;
    } else {
        message = typeof err === 'string' ? err : {};
    }
    try {
        res.status((message && message.code) || (err.code) || 401).send({
            'err': typeof message === 'string' ? message : (message.message || message.err),
            'success': false,
            'status': (message && message.code) || (err.code) || 401
        });
    } catch (err) {
        console.log(err);
        res.status(401).send({
            'err': 'Something went wrong. Please try again',
            'success': false,
            'status': 401
        });
    }
}
