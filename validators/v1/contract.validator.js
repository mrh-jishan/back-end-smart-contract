const Joi = require('joi');

const contractSchema = Joi.object().keys({
    data: Joi.string().required(),
    user: Joi.string().required(),
});


const validateCreateContract = (req, res, next) => {
    Joi.validate(res.body, contractSchema, (err, res) => {
        if (err) {
            next(err)
        } else {
            next()
        }
    })
}


module.exports = {
    validateCreateContract
}


