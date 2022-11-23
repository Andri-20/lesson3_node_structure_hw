const {fileServices} = require("../services");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await fileServices.reader();
            res.status(201).json(users)
        } catch (e) {
            next(e);
        }
    },
    getUserByID: async (req, res, next) => {
        try {
            res.status(201).json(req.user);
        } catch (e) {
            next(e);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const users = await fileServices.reader();

            const {userId} = req.params;

            const index = users.findIndex(user => user.id === +userId)

            users.splice(index, 1);

            await fileServices.writer(users);
            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const users = await fileServices.reader();

            const {userId} = req.params;
            const newUserInfo = req.body;

            const index = users.findIndex((user) => user.id === +userId);


            users[index] = {...users[index], ...newUserInfo};
            await fileServices.writer(users);
            res.json("Updated");
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res,next) => {
        try {
            const users = await fileServices.reader();

            const newUser = req.body;
            users.push({...newUser, id: users[users.length - 1].id + 1})
            await fileServices.writer(users);
            res.status(201).json("created");

        } catch (e) {
            next(e);
        }
    }
}