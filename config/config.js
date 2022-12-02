module.exports = {
    PORT: process.env.PORT || 5001,
    DB_PASSWORD: process.env.DB_PASSWORD || '34R34534',
    MONGO_URL:process.env.MONGO_URL || 'mongodb://localhost:27017/TEST',
    ACCESS_SECRET:process.env.ACCESS_SECRET || 'secretWord1',
    REFRESH_SECRET:process.env.REFRESH_SECRET || 'secretWord2'
}