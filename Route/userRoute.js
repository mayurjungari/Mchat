const express=require('express')
const router=express.Router();
const signupcontrller=require('../controller/signup')
router.get('/signup',signupcontrller.signUpPage)
router.post('/signup',signupcontrller.postSignup)

module.exports=router;