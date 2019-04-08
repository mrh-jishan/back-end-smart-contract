'use strict';

const config = require('../config/v1'),
    request = require('request');

module.exports = (req, res, next) => {
    let route, isCaptchaRequired, option, response, userIp;
    // get route from req object
    route = req.originalUrl;
    isCaptchaRequired = requireCaptchaCheck(route);
    // check if captcha feature is enabled
    if (!config.server.captcha.isEnabled) return next();

    // validate if path is part of requireCaptchaRoute
    if (!isCaptchaRequired) return next();

    response = getCaptchaResponse(req);
    if (typeof (response) !== 'string') return next({msg: 'INV_CAPTCHA', err: 'INV_CAPTCHA'});
    // if bypassCaptcha is true then bypass the process
    if (bypassCaptcha(route, response)) {
        delete req.body.captcha;
        delete req.query.captcha;
        return next();
    }
    userIp = req.connection.remoteAddress;
    // send google request
    option = {
        uri: config.server.captcha.google.uri,
        method: 'GET', json: true,
        qs: {
            secret: config.server.captcha.google.secret,
            response: response,
            remoteip: userIp
        }
    }

    request(option, (err, res, body) => {
        if (body && body.success === false) return next({msg: 'INV_CAPTCHA', err: 'INV_CAPTCHA'});
        delete req.body.captcha;
        delete req.query.captcha;
        return next();
    });
}

function requireCaptchaCheck(route) {
    // let requireCaptchaRoute = [
    //   '/api/v1/user/register',
    // ]
    // return requireCaptchaRoute.some(r => r === route);

    return true;
}

function getCaptchaResponse(req) {
    let request;
    if (['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(req.method) > -1) request = req.body;
    else if (['GET'].indexOf(req.method) > -1) request = req.query;
    else request = null;

    return request.captcha;
}

function bypassCaptcha(route, captcha) {
    return captcha === config.server.captcha.bypassCaptcha;
}
