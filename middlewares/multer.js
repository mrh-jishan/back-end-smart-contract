const multer = require('multer');
const Puid = require('puid');
const puid = new Puid();
const uuidv4 = require('uuid/v4');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + puid.generate() + uuidv4() + Date.now() + "." + file.mimetype.split('/')[1])
    }
})
var upload = multer({
    storage: storage
})

module.exports = upload;

