const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/ApiError");
const {
    ACCESS_SECRET,
    REFRESH_SECRET
} = require("../config/config");
const {tokenTypesEnum} = require("../enum");
const aouthHelper = require('../helper/AOuth.helper');
module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);
        if (!isPasswordsSame) {
            throw new ApiError("Wrong password or email", 400)
        }
    },
    generateAccessTokenPair: (dataToSign) => {
        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    },
    generateActionToken: (actionType, dataToSign = {}) => {
        let secretWord = aouthHelper.getSecretWordForActionToken(actionType);

        return jwt.sign(dataToSign, secretWord, {expiresIn: '7d'});
    },
    checkToken: (token = '', typeToken = 'accessToken') => {
        try {
            let secret = '';

            if (typeToken === tokenTypesEnum.accessToken) secret = ACCESS_SECRET;
            else if (typeToken === tokenTypesEnum.refreshToken) secret = REFRESH_SECRET;

            return jwt.verify(token, secret)

        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    },
    checkActionToken: (token, actionType) => {
        try {
            let secretWord = aouthHelper.getSecretWordForActionToken(actionType);

            jwt.verify(token, secretWord)
        } catch (e) {
            throw new ApiError('Token not valid', 401)
        }
    }

}