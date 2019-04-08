'use strict';

const multerS3 = require('multer-s3');
const multer = require('multer');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const path = require('path');

const fileExtensionWhitelist = [
    '.png',
    '.jpg',
    '.jpeg',
    '.bmp',
    '.psd',
    '.pdf'
];

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_KYC_BUCKET,
        acl: 'private',
        metadata: function (req, file, cb) {
            cb(null, {mimetype: file.mimetype});
        },
        key: function (req, file, cb) {
            cb(null, `${req.params.email}/${crypto.randomBytes(20).toString('hex') + new Date().getTime() + path.extname(file.originalname)}`)
        }
    }),
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        console.log("------------", file.mimetype);
        if (!fileExtensionWhitelist.some(e => e === ext.toLowerCase())) {
            return callback(new Error('FILE_TYPE_RESTRICTED'));
        } else {
            callback(null, true);
        }
    }
});

module.exports = {upload};
