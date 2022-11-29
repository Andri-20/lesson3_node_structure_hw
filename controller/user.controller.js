const {UserService} = require("../services");
const User = require('../DataBase/User')
module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await UserService.findByParams();
            res.status(201).json(users)
        } catch (e) {
            next(e);
        }
    },
    getUserByID: async (req, res, next) => {
        try {
            const {userId} = req.params.userId;

            const user = await UserService.findByOneByParams()
            res.status(201).json(req.user);
        } catch (e) {
            next(e);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params.userId;

            await UserService.deleteOne(userId)
            res.sendStatus(204).send("deleted");

        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params.userId;
            const {userInfo} = req.body;

            const user = await UserService.update(userId, userInfo);
            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const user = await UserService.create(req.body);
            res.status(201).json(user)
        } catch (e) {
            next(e);
        }
    }
}