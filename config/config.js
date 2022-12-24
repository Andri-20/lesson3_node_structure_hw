const Process = require("process");
module.exports = {
    PORT: process.env.PORT || 5001,

    DB_PASSWORD: process.env.DB_PASSWORD || '34R34534',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/TEST',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretWord1',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretWord2',

    USER_NAME_EMAIL: process.env.USER_NAME_EMAIL,
    USER_NAME_EMAIL_PASSWORD: process.env.USER_NAME_EMAIL_PASSWORD,

    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'CAATS',
    FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.FORGOT_PASSWORD_ACTION_TOKEN_SECRET || 'FGPATS',

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID

}