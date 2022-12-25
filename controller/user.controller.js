const {userService} = require('../services');
const User = require("../DataBase/User");
const s3Service = require('../services/s3.service');
module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findByParams();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const user = await userService.findByIdWithCars(req.user._id);

           await req.user.comparePasswords();
            console.log("---------------");
            User.testStatic();

            res.json(user);
        } catch (e) {
            next(e)
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            const user = await userService.updateOne(userId, newUserInfo);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            User.createUserWithHashPassword(req.body);

            res.status(201).json("OK");
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
             userService.deleteOne(req.params.userId);

            res.status(204).send('Ok')
        } catch (e) {
            next(e);
        }
    },
    uploadAvatar: async (req, res, next) => {
        try {
            const uploadedData = await s3Service.uploadPublicFile(req.files.avatar, 'user', req.user._id);
            const updatedUser = await User.findByIdAndUpdate(req.user._id, {avatar: uploadedData.Location}, {new: true});

            res.json(updatedUser)
        } catch (e) {
            next(e)
        }
    }
};
