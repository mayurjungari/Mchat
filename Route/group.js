const express=require('express')
const router=express.Router();
const Authentication=require('../middleware/auth')
const groupController=require('../controller/group')
router.post('/group/createGroup',Authentication.authenticate,groupController.CreateGroup)
router.get('/group/getGroups',Authentication.authenticate,groupController.GetGroups)
router.post('/group/:groupId/addMember',Authentication.authenticate,groupController.AddMember)
router.post('/group/:groupId/deleteMember',Authentication.authenticate,groupController.deleteMember)
router.get('/group/:groupId/members',Authentication.authenticate,groupController.getGroupMembers)
router.post('/group/exit',Authentication.authenticate,groupController.exitGroup)


module.exports=router