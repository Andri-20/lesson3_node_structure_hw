const validator = require('../validator/oauth.validator');
const ApiError = require("../error/ApiError");
const oauthService = require('../services/oauth.service')
const OAuth = require('../DataBase/OAuth');
const {tokenTypesEnum} = require("../enum");

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
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization')

            if (!accessToken) {
                throw new ApiError('Token not found', 401)
            }

            oauthService.checkToken(accessToken, tokenTypesEnum.accessToken);
            const tokenInfo = await OAuth.findOne({accessToken})

            if (!tokenInfo) {
                throw new ApiError('Token not valid', 401)
            }

            next()
        } catch (e) {

            next(e)
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');
            if (!refreshToken) {
                throw new ApiError('token not found', 401)
            }

            oauthService.checkToken(refreshToken, tokenTypesEnum.refreshToken)

            const tokenInfo = OAuth.findOne({refreshToken});
            if (!tokenInfo) {
                throw new ApiError('token not valid')
            }
            req.tokenInfo = tokenInfo;

            next()
        } catch (e) {

            next(e)
        }
    }
}