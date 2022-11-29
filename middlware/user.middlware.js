const User = require('../DataBase/User')

const ApiError = require('../error/ApiError');
const {UserService} = require("../services");
const { userNormalizator } = require('../helper');
module.exports = {
    checkIsUserExits: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError('User not found', 404);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    isBodyValidCreate: (req, res, next) => {
        try {
            const {name, age} = req.body;
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new ApiError('Wrong name', 400);
            }

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('Wrong age', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValidUpdate: (req, res, next) => {
        try {
            const {name, age} = req.body;
            if (name && (name.length < 3 || typeof name !== 'string')) {
                throw new ApiError('Wrong name', 400);
            }

            if (age && (age < 0 || Number.isNaN(+age))) {
                throw new ApiError('Wrong age', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isIdValid: (req, res, next) => {
        try {
            const {userId} = req.params;

            if (userId < 0 || Number.isNaN(+userId)) {
                throw new ApiError('Not valid ID', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    userNormalizator: (req, res, next) => {
        try {
            let { name, email } = req.body;

            if (name) req.body.name = userNormalizator.name(name);

            if (email) req.body.email = email.toLowerCase();

            next();
        } catch (e) {
            next(e);
        }
    },
    CheckIsEmailUnique: async (res, req, next) => {
        try {
            const { email } = req.body;

            if(!email){
                throw new ApiError("Email is not present",404)
            }

            const user = await UserService.findByOneByParams({email});
            if(user){
                throw new ApiError('User with this email already exists',409)
            }
            next()
        } catch (e) {
            next(e);
        }
    }
}
