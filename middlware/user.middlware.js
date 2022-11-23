const {fileServices} = require("../services");
const ApiError = require('../error/ApiError');
module.exports = {
    checkIsUserExits: async (req, res, next) => {
        try {
            const users = await fileServices.reader();

            const {userId} = req.params;

            const user = users.find((user) => user.id === +userId);

            if (!user) {
                throw new ApiError('User not found',404);
            }

            req.user = user;
            req.users = users;
            next();
        } catch (e) {
            next(e);
        }
    },
    isBodyValidCreate: (req, res, next) => {
        try {
            const { name, age } = req.body;
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
            const { name, age } = req.body;
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
            const { userId } = req.params;

            if (userId < 0 || Number.isNaN(+userId)) {
                throw new ApiError('Not valid ID', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
