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

const CHAT=require('./models/Chat')
const USER=require('./models/User')

USER.hasMany(CHAT); 
CHAT.belongsTo(USER);




app.get('/signup',userRoute)
app.post('/signup',userRoute)
app.get('/',userRoute)
app.post('/signin',userRoute)
app.get('/mchat',chatRoute)
app.post('/savechat',chatRoute)

app.use((req,res)=>{
    res.send('Not Found')
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