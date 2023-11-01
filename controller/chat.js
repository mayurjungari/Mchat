const path=require('path')
const CHAT=require('../models/Chat')
const ARCHIVE=require('../models/ArchiveChat')
const { Op } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');




module.exports.ChatPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','chatpage.html'))
}



module.exports.Savechat = async (req, res) => {
  try {
    const { message, groupId } = req.body;
    console.log(groupId)

    if (message) {
      await CHAT.create({
        USERNAME: req.user.USERNAME,
        MESSAGE: message,
        userID: req.user.ID,
        groupID: groupId,
      });
      res.status(200).json({ message: 'Chat saved to the database' });
    } else {
      res.status(400).json({ error: 'No message received' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};




let lastChatId = null; 

module.exports.GetChat = async (req, res) => {
  try {
    const { lastChatId: lastId } = req.query; 
   
    let newChats = [];

    
    if (lastId && lastId !== lastChatId) {
    
      newChats = await CHAT.findAll({
        where: {
          ID: {
            [Op.gt]: lastId
          }
        }
      });

     console.log(newChats)
      if (newChats.length > 0) {
        lastChatId = newChats[newChats.length - 1].ID;
      }
    }

   
    res.status(200).json({ chat: newChats });
  } catch (error) {
    
    console.error('Error occurred while fetching chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




cron.schedule('0 0 * * *', async () => {
  try {
    const chatData = await CHAT.findAll();

    if (chatData && chatData.length > 0) {
      await ARCHIVE.bulkCreate(chatData.map(data => data.toJSON())); // Assuming ARCHIVE model is correctly defined
      await CHAT.destroy({ where: {} }); // Make sure to apply appropriate filters in the where clause
      console.log('Data moved to the archive successfully.');
    } else {
      console.log('No data to move to the archive.');
    }
  } catch (error) {
    console.error('Error occurred while moving data to the archive:', error);
  }
});
