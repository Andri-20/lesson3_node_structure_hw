const router = require('express').Router();
const controller = require('../controller/oauth.controller');
const mdlwr = require('../middlware/oauth.middlware');
const userMdlwr = require('../middlware/user.middlware');

router.post('/login',mdlwr.isBodyValid,userMdlwr.getUserDynamically('email'),controller.login)

module.exports = router;