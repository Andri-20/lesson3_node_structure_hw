const Car = require('../DataBase/Car.js');
module.exports = {
    findByParams: async (filter = {}) => {
        return Car.find(filter);
    },
    findOne: async (filter = {}) => {
        return Car.findOne(filter);
    },
    findCarByIdWithUser: async (carId) => {
        return Car.findById(carId).populate('user');
    },
    create: async (carInfo) => {
        return Car.create(carInfo);
    }
}