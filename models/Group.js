const Sequelize=require('sequelize');
const sequelize = require('../util/database')

  const GROUP=sequelize.define('group',{
    ID :{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        
        autoIncrement:true,
    },
   
    GroupName :{
        type: Sequelize.STRING,
        
        
    },
    Admin:{
        type : Sequelize.STRING,
        allowNull: false,
        
   },
    
    
  
  
  },
)
  sequelize.sync()
  .then(() => {
    console.log('group sync succesfully');
    
  }).catch((err) => {
    console.log(err);
  });
  
  module.exports=GROUP