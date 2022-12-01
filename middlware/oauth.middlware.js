const validator = require('../validator/oauth.validator');
const ApiError = require("../error/ApiError");

module.exports = {
    isBodyValid: (req, res, next) => {
        try {
            const validate = validator.OAuthValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message)
            }

            next()
        } catch (e) {

            next(e)
        }
    }
}