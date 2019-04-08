const Joi = require('joi');

const registerSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({minDomainAtoms: 2})
});

module.exports = {registerSchema}
