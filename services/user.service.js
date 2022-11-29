const User = require("../DataBase/User")
module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter);
    },
    findByOneByParams: async (filter = {}) => {
        return User.findOne(filter);
    },
    create: async (userInfo) => {
        return User.create({userInfo})
    },
    deleteOne: async (userId) => {
        return User.deleteOne({_id: userId})
    },
    findByIdWithCars: async (userId) => {
        const res = await User.aggregate([
            {
                $match: {
                    _id: userId
                }
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'cars',
                }
            }
        ]);

        return res[0];
    },
    update: async (userId,newInfo) => {
        return User.findByIdAndUpdate(userId,newInfo,{new:true});
    }
}