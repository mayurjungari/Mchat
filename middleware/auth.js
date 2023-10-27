const USER=require('../models/User')
const jwt=require('jsonwebtoken')
require('dotenv').config();

module.exports.authenticate=(req,res,next)=>{
    try {
        const token =req.header('Authorization');
        
        const tokenobject=jwt.verify(token,process.env.TOKEN_SECRET)
        
        
        USER.findByPk(tokenobject.Id).then(user=>{
           
            req.user=user;
            next();
        })

        
    } catch (error) {
        console.log(error)
        return res.status(401).json({success :false})
         
    }
}