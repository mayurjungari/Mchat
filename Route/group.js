const express=require('express')
const router=express.Router();
const Authentication=require('../middleware/auth')
const groupController=require('../controller/group')
router.post('/group/createGroup',Authentication.authenticate,groupController.CreateGroup)
router.get('/group/getGroups',Authentication.authenticate,groupController.GetGroups)


module.exports=router