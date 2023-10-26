const path =require('path')
module.exports.signUpPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','signup.html'))
}