const ApiError = require("../error/ApiError");
const {userNormalizator} = require('../helper');
const validator = require('../validator/user.validator');
const commonValidator = require('../validator/common.validator');
const userService = require("../services/user.service");

module.exports = {
    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await userService.findOneByParams({[dbField]: fieldToSearch});

            if (!user) {
                throw new ApiError('User not found', 404);
            }

            req.user = user;

            next()
        } catch (e) {
            next(e);
        }
    },

    isBodyValidCreate: (req, res, next) => {
        try {
            const {name, age, email} = req.body;

            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new ApiError('Wrong name', 400);
            }

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('Wrong age', 400);
            }

            if (!email || !email.includes('@')) {
                throw new ApiError('Wrong email', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValidUpdate: (req, res, next) => {
        try {
            const {name, age, email} = req.body;
            if (name && (name.length < 3 || typeof name !== 'string')) {
                throw new ApiError('Wrong name', 400);
            }

            if (age && (age < 0 || Number.isNaN(+age))) {
                throw new ApiError('Wrong age', 400);
            }

            if (email && !email.includes('@')) {
                throw new ApiError('Wrong email', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    userNormalizator: (req, res, next) => {
        try {
            let {name, email} = req.body;

            if (name) req.body.name = userNormalizator.name(name);

            if (email) req.body.email = email.toLowerCase();

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                throw new ApiError('Email not present', 400);
            }

            const user = await userService.findOneByParams({email});

            if (user) {
                throw new ApiError('User with this email already exists', 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isNewUserValid: async (req, res, next) => {
        try {
            const validate = validator.newUserValidator.validate(req.body);
            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.body = validate.value;
            next()
        } catch (e) {

            next(e)
        }
    },
    isUpdateUserValid: (req, res, next) => {
        try {
            const validate = validator.updateUserValidator.validate(req.body);
            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.body = validate.value;
            next()
        } catch (e) {

            next(e)
        }
    },
    isUserIdValid: (req, res, next) => {
        try {
            const {userId} = req.params;

            const validate = commonValidator.IdValidator.validate(userId);
            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next()
        } catch (e) {

            next(e)
        }
    }
}
