const Joi = require('joi');
const regexp = require('../config/regexp.enum');

module.exports = {
    IdValidator:Joi.string().regex(regexp.MONGO_ID)
}