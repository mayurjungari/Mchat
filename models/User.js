const Sequelize=require('sequelize');
const sequelize = require('../util/database')

  const USER=sequelize.define('user',{
    ID :{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        
        autoIncrement:true,
    },
    Email :{
        type: Sequelize.STRING,
        allowNull: false,
        
        unique: true,
    },
    USERNAME :{
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    PHONE:{
        type : Sequelize.STRING,
        allowNull: false,
   },
    
    PASSWORD :{
        type: Sequelize.STRING,
        allowNull: false,
        
    },
  
  
  },
)
  sequelize.sync()
  .then(() => {
    console.log('sync succesfully');
    
  }).catch((err) => {
    console.log(err);
  });
  
  module.exports=USER