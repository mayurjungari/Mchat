const express=require('express')
const app=express();


const path=require('path')






const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname,'Public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const sequelize=require('./util/database')
const cors=require('cors')
app.use(cors({
    origin: 'http://localhost:3000' 
  }));
  
  


const userRoute=require('./Route/userRoute');
const chatRoute=require('./Route/chat')
const groupRoute=require('./Route/group')

const CHAT=require('./models/Chat')
const USER=require('./models/User')
const GROUP=require('./models/Group')
const USERGROUP=require('./models/UserGroup')
const ARCHIVE=require('./models/ArchiveChat')


USER.hasMany(CHAT); 
CHAT.belongsTo(USER);
CHAT.belongsTo(GROUP);

USER.hasMany(USERGROUP)

GROUP.hasMany(USERGROUP)
GROUP.hasMany(CHAT)

USERGROUP.belongsTo(USER)
USERGROUP.belongsTo(GROUP)










app.get('/signup',userRoute)
app.post('/signup',userRoute)
app.get('/',userRoute)
app.post('/signin',userRoute)
app.get('/mchat',chatRoute)
app.post('/savechat',chatRoute)
// app.get('/getAllChat',chatRoute)
app.post('/group/createGroup',groupRoute)
app.get('/group/getGroups',groupRoute)


const { Op } = require('sequelize');



app.get('/chat/group/:groupId', async (req, res) => {
  const { groupId } = req.params;
  let lastFetchedChatId = req.query.lastFetchedChatId;


  try {
    let chatData = [];

    if (lastFetchedChatId) {
      chatData = await CHAT.findAll({ where: { groupID: groupId, id: { [Op.gt]: lastFetchedChatId } } });
    }
   

    res.status(200).json({ chat: chatData });
  } catch (error) {
    console.error('Error occurred while fetching chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.post('/group/:groupId/addMember',groupRoute)
app.post('/group/:groupId/deleteMember',groupRoute)
app.get('/group/:groupId/members',groupRoute)
app.post('/group/exit',groupRoute)














app.use((req,res)=>{
    res.status(404).send('Not Foundd')
})
sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized');
    
  })
  .catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });



  






app.listen(3000,()=>{
    console.log('Server in running on port 3000')
})