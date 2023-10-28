const express=require('express')
const router=express.Router();
const Authentication=require('../middleware/auth')
const groupController=require('../controller/group')
router.post('/group/createGroup',Authentication.authenticate,groupController.CreateGroup)


module.exports=router