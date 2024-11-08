const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/user/register', userController.resgisterUser);
router.post('/user/assingCostCenter', userController.assingCostCenter);
router.post('/user/assingPermisson', userController.assingPermisson);
router.post('/user/changeUserStatus', userController.changeUserStatus);
router.post('/user/setUserMenu', userController.setUserMenu);
router.post('/users/GetUsersWithoutDepto', userController.getAllUsersWithoutDepto);
router.post('/users/getInactiveUsers', userController.getInactiveUsers);
router.post('/users/getUsersByDepto', userController.getUsersByDpeto);

module.exports = router;