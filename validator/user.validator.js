const Joi = require('joi');
const regexp = require('../config/regexp.enum');

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(30).default('').required(),
        email: Joi.string().lowercase().trim().regex(regexp.EMAIL).required(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
        age: Joi.number().min(5).max(120).default(18).required(),
        phone: Joi.string().regex(regexp.PHONE).required(),
    }),
    updateUserValidator:Joi.object({
        name: Joi.string().min(2).max(30).default('').optional(),
        email: Joi.string().lowercase().trim().regex(regexp.EMAIL).optional(),
        age: Joi.number().min(5).max(120).default(18).optional()
    })
}
