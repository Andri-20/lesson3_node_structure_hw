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

    S3_BUCKET_NAME:process.env.S3_BUCKET_NAME,
    S3_BUCKET_REGION:process.env.S3_BUCKET_REGION,
    S3_ACCESS_KEY:process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY:process.env.S3_SECRET_KEY
}