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
  