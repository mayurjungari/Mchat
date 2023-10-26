const path=require('path')
const CHAT=require('../models/Chat')
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