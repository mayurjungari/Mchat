const path=require('path')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const USER=require('../models/User')
module.exports.signInPage=(req,res)=>{
res.sendFile(path.join(__dirname,'../','Views','signin.html'))
}

module.exports.postSignIn=async (req,res)=>{
   const {email,password}=req.body;
   try {
    const user=await USER.findOne({where:{Email:email}})
    console.log(user)
    if(!user)
    {
        res.status(404).json({message:"user not found"})
    }
    else {
       await bcrypt.compare(password, user.PASSWORD, (err, isPasswordCorrect) => {
            if (err) {
                console.error('Error during password comparison:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else if (isPasswordCorrect) {

                const payload = {
                    Id: user.ID,
                    email: user.Email,
                    phone: user.PHONE,
                    name: user.USERNAME
                };

                const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' }); 
                res.status(200).json({ message: 'Successfully logged in', token: token });
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        });
    }
    
    
   } catch (error) {
    res.json({'error':error})
   }
   



}