

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
//-------------------------------------------------------------------------------------------------------
function showChat(data) {
    data.forEach(chat => {
        const messageContainer = document.getElementById('message-container');
        const chatElement = document.createElement('div');
        const userNameElement = document.createElement('p');
        userNameElement.innerHTML = `<strong>${chat.USERNAME}:-----  </strong> ${chat.MESSAGE}`;
        // const messageElement = document.createElement('p');
        // messageElement.textContent = chat.MESSAGE;
        chatElement.appendChild(userNameElement);
        // chatElement.appendChild(messageElement);
        messageContainer.appendChild(chatElement);
    });
}




async function getAllMessage(){
    const token=localStorage.getItem('token')

    const response=await axios.get('/getAllChat', {
        headers: {
            'Authorization': token
        }
    })
  showChat(response.data.chat)



}
getAllMessage()