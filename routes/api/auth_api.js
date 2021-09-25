const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const UserController = require('../../controller/UserController');

router.post('/', UserController.dashboard);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/otp_verification', UserController.otp_verification);

router.post('/logout', UserController.logout);

module.exports = router;