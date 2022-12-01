const oauthService = require("../services/oauth.service");
const OAuth = require('../DataBase/OAuth');
module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await oauthService.comparePasswords(user.password, body.password)
            const tokenPairs = oauthService.generateAccessTokenPairs({id: user._id});
            await OAuth.create({...tokenPairs, _user_id: user._id});

            res.json({
                ...tokenPairs,
                user
            })
        } catch (e) {
            next(e)
        }
    }
}