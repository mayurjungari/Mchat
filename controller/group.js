const USER=require('../models/User')
const GROUP=require('../models/Group')
const USERGROUP=require('../models/UserGroup');
const { Op } = require('sequelize');
module.exports.CreateGroup = async (req, res) => {
    try {
      const groupName = req.body.groupName;
      const admin = req.user.USERNAME;
      const members = req.body.members;
      const group = await GROUP.create({ GroupName: groupName, Admin: admin });
  
      const invitedMembers = await USER.findAll({
        where: {
          Email: {
            [Op.or]: members,
          },
        },
      });
  
      await Promise.all(
        invitedMembers.map(async (user) => {
          await USERGROUP.create({
            isadmin: false,
            userID: user.dataValues.ID,
            groupID: group.dataValues.ID,
          });
        })
      );
  
      await USERGROUP.create({
        isadmin: true,
        userID: req.user.ID,
        groupID: group.dataValues.ID,
      });
  
      res.status(201).json({ group: group.dataValues.GroupName, members: members });
    } catch (error) {
      console.log(error);
    }
  };
  


 module.exports.GetGroups = async (req, res, next) => {
    try {
      const groups = await GROUP.findAll({
        attributes: ["GroupName", "Admin",'ID'],
        include: [
          {
            model: USERGROUP,
            where: { userID: req.user.ID },
          },
        ],
      });
    
      res.status(200).json({ groups: groups });
    } catch (error) {
      console.log(error);
    }
  };  


  module.exports.AddMember = async (req, res) => {
    const { groupId } = req.params;
    const { email } = req.body;
  
    try {
      const user = await USER.findOne({ where: { Email: email } });
      const group = await GROUP.findOne({ where: { ID: groupId } });
      console.log(group.Admin,req.user.USERNAME,group)
  
      if (!(group.Admin===req.user.USERNAME)) {
        return res.status(400).json({ message: 'You are not admin' });
      }
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      if (!group) {
        return res.status(404).send('Group not found');
      }
  
      const isUserAlreadyInGroup = await USERGROUP.findOne({ where: { userID: user.ID, groupID: groupId } });
  
      if (isUserAlreadyInGroup) {
        return res.status(400).json({ message: 'User already exists in the group' });
      }
  
      await USERGROUP.create({ userID: user.ID, groupID: groupId, isadmin: false });
  
      return res.status(200).send(`Member with email ${email} added to the group.`);
    } catch (error) {
      console.error('Error occurred while adding a member to the group:', error);
      return res.status(500).send('Internal Server Error');
    }
  };



  module.exports.exitGroup = async (req, res) => {
    const { groupId } = req.body; // Assuming the group ID is sent in the request body
  
    try {
      const group = await GROUP.findOne({ where: { ID: groupId } });
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      await USERGROUP.destroy({ where: { userID: req.user.ID, groupID: groupId } });
  
      return res.status(200).json({ message: 'Exited group successfully.' });
    } catch (error) {
      console.error('Error occurred while exiting the group:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  


  module.exports.deleteMember = async (req, res) => {
    const { groupId } = req.params;
    const { email } = req.body;
  
    try {
      const user = await USER.findOne({ where: { Email: email } });
      const group = await GROUP.findOne({ where: { ID: groupId } });
  
      if (!(group.Admin === req.user.USERNAME)) {
        return res.status(400).json({ message: 'You are not admin' });
      }
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      await USERGROUP.destroy({ where: { userID: user.ID, groupID: groupId } });
  
      return res.status(200).json({ message: `Member with email ${email} removed from the group.` });
    } catch (error) {
      console.error('Error occurred while removing a member from the group:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };



  module.exports.getGroupMembers = async (req, res) => {
    const { groupId } = req.params;
  
    try {
      const group = await GROUP.findOne({ where: { ID: groupId } });
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      const groupMembers = await USERGROUP.findAll({
        where: { groupID: groupId },
        include: USER,
      });
  
      const members = groupMembers.map((member) => {
        return {
          username: member.user.USERNAME,
          email: member.user.Email,
        };
      });
  
      return res.status(200).json({ members });
    } catch (error) {
      console.error('Error occurred while fetching group members:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  






 