const express=require('express')
const router=express.Router();
const chatPageController=require('../controller/chat')
router.get('/mchat',chatPageController.ChatPage)
module.exports=router