const path=require('path')
const CHAT=require('../models/Chat')
const { Op } = require('sequelize');
module.exports.ChatPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','chatpage.html'))
}

module.exports.Savechat=async(req,res)=>{
  const message=req.body.message;
  try {
    await CHAT.create({
        USERNAME:req.user.USERNAME,
       MESSAGE:message,
       userID:req.user.ID 

    })
    res.status(200).json({message:" Chat save to database"})
    
  } catch (error) {
    res.json({"error":error})
    
  }
   
}


let lastChatId = null; 

module.exports.GetChat = async (req, res) => {
  try {
    const { lastChatId: lastId } = req.query; 
    console.log('lastChatId....................................................')
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
