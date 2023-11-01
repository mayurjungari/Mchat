const Sequelize=require('sequelize');
const sequelize = require('../util/database')

  const Archive=sequelize.define('archive',{
    ID :{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        
       
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
    console.log('archat sync succesfully');
    
  }).catch((err) => {
    console.log(err);
  });
  
  module.exports=Archive
