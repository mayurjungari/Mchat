const path=require('path')
module.exports.ChatPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','chatpage.html'))
}