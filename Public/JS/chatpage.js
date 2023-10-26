
document.getElementById('send-button').onclick = async function() {
   
    const message =document.getElementById('message-input').value
    const token=localStorage.getItem('token');

    try{
    const response=await  axios.post('/savechat',{message}, {
        headers: {
            'Authorization': token
        }
    })
    if(response.status===200) 
    document.getElementById('message-input').value=''
}
catch(error)
{
    console.log(error)
}
    
  
   
};