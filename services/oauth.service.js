const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/ApiError");
module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);
        if (!isPasswordsSame) {
            throw new ApiError("Wrong password or email", 400)
        }
    },
    generateAccessTokenPairs: (dataToSign) => {
        const accessToken = jwt.sign(dataToSign, "secretWord1", {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, "secretWord2", {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

}