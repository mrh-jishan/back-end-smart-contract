'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname + './../../.pem/private.pem'), 'utf8');
const publicKey = fs.readFileSync(path.resolve(__dirname + './../../.pem/public.pem'), 'utf8');
const model = require('../../models');
const bcrypt = require('bcrypt');


const generateToken = (config) => new Promise((resolve, reject) => {
    let tokenObj = {role: 'client', email: config.email}
    let jwtData = {};
    let now = new Date().getTime();
    let accessTokenExp = now + Number(process.env.TOKEN_EXP_MILLISEC);
    jwtData.exp = accessTokenExp;
    jwtData.data = tokenObj;
    jwt.sign(jwtData, privateKey, {algorithm: process.env.JWT_ALGORITHM}, (err, token) => {
        if (err) {
            reject({
                err: "TRY_AGAIN"
            });
        } else {
            let tokenObj = {
                "role": 'client',
                "accessToken": token,
                "accessTokenExp": accessTokenExp,
                "refreshToken": bcrypt.hashSync(config.email, 10),
                "refreshTokenExp": now + Number(process.env.REFRESH_TOKEN_EXP),
                "valid": true
            };
            model.Auth.create(tokenObj).then(resolve).catch(reject);
        }
    });
});


// const createNewAccessToken = config => new Promise((resolve, reject) => {
//     let tokenObj = {role: 'client', email: config.email}
//     let jwtData = {};
//     let now = new Date().getTime();
//     jwtData.exp = now + Number(process.env.TOKEN_EXP_MILLISEC);
//     jwtData.data = tokenObj;
//     jwt.sign(jwtData, privateKey, {algorithm: process.env.JWT_ALGORITHM}, (err, token) => {
//         if (err) {
//             reject(err)
//         } else {
//             resolve(token)
//         }
//     });
// });


//
// const signJWT = config => new Promise((resolve, reject) => {
//     let tokenObj = config;
//     let jwtData = {};
//     let now = new Date().getTime();
//     let accessTokenExp = now + (Number(process.env.ACCESS_EXPIRY_MINS) * 60 * 1000);
//     jwtData.exp = accessTokenExp;
//     jwtData.data = tokenObj;
//     jwt.sign(jwtData, privateKey, {
//         algorithm: process.env.JWT_ALGORITHM
//     }, function (err, token) {
//         if (err) {
//             reject(err)
//         } else {
//             resolve(token)
//         }
//     });
// });
//


// const verifyToken = (token, apikey) => new Promise((resolve, reject) => {
//     if (!token) {
//         reject({
//             err: 'UNAUTHORIZED_TOKEN'
//         });
//     } else if (!apikey) {
//         reject({
//             err: 'UNAUTHORIZED_API_KEY'
//         });
//     } else if (apikey !== process.env.API_KEY) {
//         reject({
//             err: 'UNAUTHORIZED_API_KEY'
//         });
//     } else if (token) {
//         jwt.verify(token, publicKey, (err, decoded) => {
//             if (err) {
//                 reject({
//                     err: "UNAUTHORIZED_TOKEN"
//                 });
//             } else {
//                 resolve(true)
//             }
//         });
//     } else {
//         reject({
//             err: 'UNAUTHORIZED_TOKEN'
//         });
//     }
// });


//
// const decode = (token) => new Promise((resolve, reject) => {
//     console.log(token);
//     if (!token) {
//         reject({
//             err: 'UNAUTHORIZED_TOKEN'
//         });
//     } else if (token) {
//         jwt.verify(token, publicKey, (err, decoded) => {
//             if (err) {
//                 console.log("*******", err);
//                 reject({
//                     err: "UNAUTHORIZED_TOKEN"
//                 });
//             } else {
//                 console.log("---", decoded);
//                 resolve(decoded);
//             }
//         });
//     } else {
//         reject({
//             err: 'UNAUTHORIZED_TOKEN'
//         });
//     }
// });
//
// const createAccessToken = config => new Promise((resolve, reject) => {
//     model.Access.create(config)
//         .then(resolve)
//         .catch(reject)
// });
//
// const deactivatePrevToken = user => new Promise((resolve, reject) => {
//     model.Auth.read({
//         'userId': user._id,
//         'valid': true
//     })
//         .then(auth => {
//             if (!auth) {
//                 resolve()
//             } else {
//
//                 auth.valid = false;
//                 return model.Auth.update({
//                     '_id': auth._id
//                 }, {
//                     $set: auth
//                 })
//             }
//         })
//         .then(resolve)
//         .catch(reject)
// });
//
// const regenerateAccessToken = config => new Promise((resolve, reject) => {
//     console.log(config);
//     let authTokenObj;
//     model.Auth.read({
//         'accessToken': config.accessToken,
//         'valid': true
//     })
//         .then(authObj => {
//             if (!authObj) {
//                 reject({err: "UNAUTHORIZED_TOKEN"})
//             } else if (authObj.refreshTokenExp <= new Date().getTime()) {
//                 authObj.valid = false;
//                 model.Auth.update({
//                     '_id': authObj._id
//                 }, {
//                     $set: authObj
//                 })
//                     .then(info => reject({err: "TKN_TIME_OUT"}))
//                     .catch(reject)
//             } else if (authObj.refreshToken != config.refreshToken) {
//                 reject({err: "UNAUTHORIZED_TOKEN"})
//             } else {
//                 authTokenObj = authObj;
//                 return createNewAccessToken({email: config.email})
//             }
//         })
//         .then(token => {
//             authTokenObj.accesstoken = token;
//             authTokenObj.accessTokenExp = new Date().getTime() + Number(process.env.TOKEN_EXP_MILLISEC);
//             return model.Auth.update({
//                 '_id': authTokenObj._id
//             }, {
//                 $set: authTokenObj
//             })
//         })
//         .then(info => model.Auth.read({'_id': authTokenObj._id}))
//         .then(doc => resolve(doc.accessToken))
//         .catch(reject)
// });
//
//
// const me = config => new Promise((resolve, reject) => {
//     model.UserData.read({
//         'email': config.data.email
//     })
//         .then(resolve)
//         .catch(reject)
// });
//
//
// const getAuthToken = config => new Promise((resolve, reject) => {
//     helper.Fineract.connect({
//         uri: `${helper.URL.superAdminLogin}?grant_type=${config.grantType || 'password'}&username=${config.userName}&password=${config.password}`,
//         method: 'POST',
//         'headers': {
//             'x-tenant-identifier': process.env.TENENT_ID
//         },
//         json: true
//     })
//         .then(resolve)
//         .catch(reject)
// });
//
//

//
// const refreshToken = config => new Promise((resolve, reject) => {
//     helper.Fineract.connect({
//         uri: `${helper.URL.refreshToken}?grant_type=refresh_token`,
//         method: 'POST',
//         'headers': {
//             'x-tenant-identifier': process.env.TENENT_ID,
//             'identity-refreshtoken': config.refreshToken
//         },
//         json: true,
//         body: {}
//     })
//         .then(resolve)
//         .catch(reject)
// });


module.exports = {generateToken}
