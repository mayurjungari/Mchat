const express=require('express')
const app=express();


const userRoute=require('./Route/userRoute')


app.get('/signup',userRoute)

app.use((req,res)=>{
    res.send('Not Found')
})

app.listen(3000,()=>{
    console.log('Server in running on port 3000')
})