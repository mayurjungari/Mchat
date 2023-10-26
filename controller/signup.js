const path =require('path')
const bcrypt=require('bcrypt')

const USER=require('../models/User')
const bodyParser = require('body-parser')
module.exports.signUpPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','signup.html'))
}
module.exports.postSignup = async (req, res) => {
    const { email, name, phone, password } = req.body;
    const SALT_ROUNDS=10;

    try {
        const exhistUser = await USER.findOne({ where: { Email: email } });
        if (exhistUser) {
            res.status(501).json({ message: "User already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            await USER.create({
                Email: email,
                USERNAME: name,
                PHONE: phone,
                PASSWORD: hashedPassword,
            });
            res.status(200).json({ message: "Signup successfully" });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


