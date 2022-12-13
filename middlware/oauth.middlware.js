const validator = require('../validator/oauth.validator');
const ApiError = require("../error/ApiError");
const oauthService = require('../services/oauth.service')
const OAuth = require('../DataBase/OAuth');
const OldPassword = require('../DataBase/OldPassword');
const {tokenTypesEnum} = require("../enum");
const {FORGOT_PASS} = require("../config/token-action.enum");
const ActionToken = require("../DataBase/ActionToken");
const {compareOldPasswords} = require("../services/oauth.service");

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

            req.tokenInfo = tokenInfo;

            next()
        } catch (e) {

            next(e)
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');
            if (!refreshToken) {
                throw new ApiError('Token not found', 401)
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
    },
    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization')

            if (!actionToken) {
                throw new ApiError('Token not found', 401)
            }

            oauthService.checkActionToken(actionToken, FORGOT_PASS);

            const tokenInfo = await ActionToken
                .findOne({token: actionToken, tokenType: FORGOT_PASS})
                .populate('_user_id');

            if (!tokenInfo) {
                throw new ApiError('Token not valid', 401)
            }
            req.user = tokenInfo._user_id;

            next()
        } catch (e) {

            next(e)
        }
    },
    checkOldPasswords: async (req, res, next) => {
        try {
            const {user,body} = req;

            const oldPasswords = await OldPassword.find({_user_id: user._id}).lean();

            if(!oldPasswords.length){
                next()
            }
            const results = await Promise.all(oldPasswords.map((record)=>compareOldPasswords(record.password, body.password)));

            const condition = results.some((res)=>res);

            if(condition){
                throw new ApiError('This is old password',409)
            }

            next()
        } catch (e) {

            next(e)
        }
    }
}