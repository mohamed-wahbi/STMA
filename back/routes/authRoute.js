const express = require('express');
const { registerCtel, loginCtrl, userInfoCtrl } = require('../controllers/authController');
const { verifyTokenAndOnlyUser } = require('../middlweare/tokenVerify');
const router = express.Router();

// register route :
router.route('/register').post(registerCtel);

//Login route :
router.route('/login').post(loginCtrl)

//user ingo get :
router.route('/userinfo').get(verifyTokenAndOnlyUser,userInfoCtrl)

module.exports = router;