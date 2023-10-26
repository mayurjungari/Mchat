const express=require('express')
const router=express.Router();
const signupcontrller=require('../controller/signup')
const signincontrller=require('../controller/signin')
router.get('/signup',signupcontrller.signUpPage)
router.post('/signup',signupcontrller.postSignup)
router.get('/',signincontrller.signInPage)
router.post('/signin',signincontrller.postSignIn)

module.exports=router;