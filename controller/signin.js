const path=require('path')
module.exports.signInPage=(req,res)=>{
res.sendFile(path.join(__dirname,'../','Views','signin.html'))
}