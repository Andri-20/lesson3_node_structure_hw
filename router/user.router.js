const router = require('express').Router();

const controller = require('../controller/user.controller');
const mdlwr = require('../middlware/user.middlware');

router.get('/', controller.getAllUsers);
router.post('/',mdlwr.isBodyValidCreate,mdlwr.userNormalizator,mdlwr.CheckIsEmailUnique, controller.createUser);

router.get('/:userId', mdlwr.checkIsUserExits, controller.getUserByID);
router.put('/:userId', mdlwr.checkIsUserExits,mdlwr.isBodyValidUpdate, controller.updateUser);
router.delete('/:userId', mdlwr.checkIsUserExits, controller.deleteUserById);

module.exports = router;