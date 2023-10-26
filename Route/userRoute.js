const express=require('express')
const router=express.Router();
const signupcontrller=require('../controller/signup')
router.get('/signup',signupcontrller.signUpPage)

module.exports=router;