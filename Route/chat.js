const express=require('express')
const router=express.Router();
const Authentication=require('../middleware/auth')
const chatPageController=require('../controller/chat')
router.get('/mchat',chatPageController.ChatPage)
router.post('/savechat',Authentication.authenticate,chatPageController.Savechat)
module.exports=router