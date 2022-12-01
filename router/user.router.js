const router = require('express').Router();

const { userController } = require("../controller");
const mdlwr = require("../middlware/user.middlware");

router.get('/',
    userController.getAllUsers);
router.post('/',
    mdlwr.isNewUserValid,
    mdlwr.isBodyValidCreate,
    mdlwr.userNormalizator,
    mdlwr.checkIsEmailUnique,
    userController.createUser);

router.get('/:userId',
    mdlwr.getUserDynamically('userId','params','_id'),
    userController.getUserById);
router.put('/:userId',
    mdlwr.getUserDynamically('userId','params','_id'),
    mdlwr.isUpdateUserValid,
    mdlwr.isUserIdValid,
    mdlwr.isBodyValidUpdate,
    mdlwr.userNormalizator,
    userController.updateUser);
router.delete('/:userId',
    userController.deleteUserById);

module.exports = router;
