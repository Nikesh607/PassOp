const express = require('express')
const router = express.Router();
const {body} = require('express-validator')
const userController = require('../controller/user.controller')
const userAuthentication = require('../middleware/auth.middleware')

router.post('/register',[
    body('name').isLength({min:3}).withMessage('The name must be 3 character long'),
    body('email').isEmail().withMessage('Please enter a valid Email'),
    body('password').isLength({min:6}).withMessage('The password must be 6 character long')
],userController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min:6}).withMessage("The password must be 6 character long")
],userController.loginUser)


router.post('/addcredentials',userAuthentication.authUser,userController.addCredentials)
router.delete('/removecredentials/:_id',userAuthentication.authUser,userController.removeCredentials)
router.get('/credentials',userAuthentication.authUser,userController.getCredentials)
router.get('/logout',userAuthentication.authUser,userController.logoutUser)

module.exports = router