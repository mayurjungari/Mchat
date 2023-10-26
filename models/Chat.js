const Sequelize=require('sequelize');
const sequelize = require('../util/database')

  const CHAT=sequelize.define('chat',{
    ID :{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        
        autoIncrement:true,
    },
   
    USERNAME :{
        type: Sequelize.STRING,
        
        
    },
    MESSAGE:{
        type : Sequelize.STRING,
        
   },
    
    
  
  
  },
)
  sequelize.sync()
  .then(() => {
    console.log('chat sync succesfully');
    
  }).catch((err) => {
    console.log(err);
  });
  
  module.exports=CHAT
