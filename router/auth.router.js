const router = require('express').Router();
const controller = require('../controller/oauth.controller');
const mdlwr = require('../middlware/oauth.middlware');
const userMdlwr = require('../middlware/user.middlware');

router.post('/login', mdlwr.isBodyValid, userMdlwr.getUserDynamically('email'), controller.login);

router.post('/refresh', mdlwr.checkRefreshToken, controller.refresh);

router.post('/logout', mdlwr.checkAccessToken, controller.logout);

router.post('/logoutAll', mdlwr.checkAccessToken, controller.logoutAll);

router.post('/password/forgot',userMdlwr.getUserDynamically('email'),controller.forgotPassword)

router.put('/password/forgot',mdlwr.checkActionToken,mdlwr.checkOldPasswords,controller.forgotPasswordAfterForgot)

module.exports = router;