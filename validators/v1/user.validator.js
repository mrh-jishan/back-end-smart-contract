const Joi = require('joi');
const model = require('./../../models')

const registerSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().required().email({minDomainAtoms: 2})
});


const loginSchema = Joi.object().keys({
    password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().required().email({minDomainAtoms: 2})
});


const validateRegisterData = (req, res, next) => {
    Joi.validate(res.body, registerSchema, (err, res) => {
        if (err) {
            next(err)
        } else {
            next()
        }
    })
}


const validateLoginData = (req, res, next) => {
    Joi.validate(res.body, loginSchema, (err, res) => {
        if (err) {
            next(err)
        } else {
            next()
        }
    })
}


const validateEmail = (req, res, next) => {
    model.User.read({email: req.body.email}).then(user => {
        if (user) {
            next({'err': 'ALREADY_REGISTERED'})
        } else {
            next()
        }
    })
}


module.exports =
    {
        validateRegisterData,
        validateLoginData,
        validateEmail,
    }


