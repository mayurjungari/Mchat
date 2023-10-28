

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
      chatElement.style.marginBottom = '15px';
      
      messageContainer.appendChild(chatElement);
      
  });
}

async function getAllMessage(lastChatId) {
  try {
     
      const token = localStorage.getItem('token')

      const response = await axios.get(`/getAllChat?lastChatId=${lastChatId}`, {
          headers: {
              'Authorization': token
          }
      });
      console.log(response)

      const chatData = response.data.chat;

      
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
console.log(LastChatId);


getAllMessage(LastChatId);




async function createGroup() {
    try {
      const groupName = prompt("Group Name");
      const members = [];
      let userInput;
      while (userInput !== "done") {
        userInput = prompt(
          `Enter the email Id of Users to Add! Please Enter Valid Email Id Otherwise User will not get Added. Type "done" when you finished!`
        );
        if (userInput !== "done") {
          members.push(userInput);
        }
      }
  
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/group/createGroup",
        {
          groupName: groupName,
          members: members,
        },
        { headers: { Authorization: token } }
      );
      alert(`${groupName} Created Successfully!`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }





