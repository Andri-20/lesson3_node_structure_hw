const Joi = require('joi');
const regexp = require('../config/regexp.enum');

module.exports = {
    OAuthValidator:Joi.object({
        password:Joi.string().regex(regexp.PASSWORD).required(),
        email:Joi.string().trim().regex(regexp.EMAIL).required()
    })
}