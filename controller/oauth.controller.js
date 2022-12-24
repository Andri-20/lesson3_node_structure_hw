const oauthService = require("../services/oauth.service");
const OAuth = require('../DataBase/OAuth');
const ActionToken = require('../DataBase/ActionToken');
const emailService = require('../services/email.service');
const smsService = require("../services/sms.service");
const { smsActionTypeEnum } = require("../enum");
const smsTemplate = require("../helper/sms-template.helper");
const userService = require('../services/user.service');
const OldPassword = require('../DataBase/OldPassword');
const {WELCOME, FORGOT_PASSWORD} = require("../config/email-action.enum");
const {FORGOT_PASS} = require("../config/token-action.enum");
const {FRONTEND_URL} = require("../config/config");
module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail('andsobtest@gmail.com', WELCOME, {userName: user.name})
            await smsService.sendSms(smsTemplate[smsActionTypeEnum.WELCOME](user.name), user.phone)
            await oauthService.comparePasswords(user.password, body.password)
            const tokenPairs = oauthService.generateAccessTokenPair({id: user._id});
            await OAuth.create({...tokenPairs, _user_id: user._id});

            res.json({
                ...tokenPairs,
                user
            })
        } catch (e) {
            next(e)
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo;

            await OAuth.deleteOne({refreshToken});

            const tokenPair = oauthService.generateAccessTokenPair({id: _user_id});

            await OAuth.create({...tokenPair, _user_id})

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const {accessToken} = req.tokenInfo;

            await OAuth.deleteOne({accessToken})

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    logoutAll: async (req, res, next) => {
        try {
            const {_user_id} = req.tokenInfo;

            await OAuth.deleteMany({_user_id})

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const {name, _id, email} = req.user;

            const actionToken = oauthService.generateActionToken(FORGOT_PASS, {email});

            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`

            await ActionToken.create({token: actionToken, tokenType: FORGOT_PASS, _user_id: _id})
            await emailService.sendEmail('andsobtest@gmail.com', FORGOT_PASSWORD, {
                url: forgotPassFEUrl,
                userName: name
            })

            res.json("ok")
        } catch (e) {

            next(e)
        }
    },
    forgotPasswordAfterForgot: async (req, res, next) => {
        try {
            const {user, body} = req;
            const hashPassword = await oauthService.hashPassword(body.password);

            await OldPassword.create({_user_id: user.id, password: user.password});

            await ActionToken.deleteOne({token: req.get('Authorization')})
            await userService.updateOne({_id: user._id}, {password: hashPassword});

            res.json("ok")
        } catch (e) {

            next(e)
        }
    }

}