

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
       
        chatElement.appendChild(userNameElement);
        
        messageContainer.appendChild(chatElement);
    });
}

async function getAllMessage(lastChatId) {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`/getAllChat?lastChatId=${lastChatId}`, {
            headers: {
                'Authorization': token
            }
        });
        

        const chatData = response.data.chat;

        // Storing the last 10 chat messages in local storage
        const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
        storedChats.push(...chatData);
        const lastTenChats = storedChats.slice(Math.max(storedChats.length - 10, 0));
        localStorage.setItem('chats', JSON.stringify(lastTenChats));

        showChat(lastTenChats);
    } catch (error) {
        console.error("Error occurred while fetching chat:", error);
    }
}


const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
const LastChatId = storedChats.length > 0 ? storedChats[storedChats.length - 1].ID : null;
console.log(LastChatId)

getAllMessage(LastChatId);



// async function getAllMessage(){
//     const token=localStorage.getItem('token')

//     const response=await axios.get('/getAllChat', {
//         headers: {
//             'Authorization': token
//         }
//     })
//     console.log(response.data)
//   showChat(response.data.chat)

// }
// getAllMessage()

// setInterval(async () => {
//     await getAllMessage();
// }, 1000);