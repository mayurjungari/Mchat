


document.getElementById('send-button').onclick = async function () {
  const message = document.getElementById('message-input').value;
  const groupId = document.getElementById('active-group-id').value;
  const token = localStorage.getItem('token');

  try {
    const requestData = {
      groupId: groupId,
      message: message,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await axios.post('/savechat', requestData, config);

    if (response.status === 200) {
      document.getElementById('message-input').value = '';
      
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

















function showChat(chatArray) {
  console.log('kya karu mei ladies')
  const messageContainer = document.getElementById('message-container');
  messageContainer.innerHTML = ''; // Clear the existing chat messages

  chatArray.forEach(chat => {
    const chatElement = document.createElement('div');
    const userNameElement = document.createElement('p');
    userNameElement.innerHTML = `<strong>${chat.USERNAME}:-----  </strong> ${chat.MESSAGE}`;
    chatElement.appendChild(userNameElement);
    chatElement.style.marginBottom = '15px';
    messageContainer.appendChild(chatElement);
   
  });
  messageContainer.scrollTop = messageContainer.scrollHeight;
}



async function createGroup() {
  try {
      const groupName = prompt("Group Name");
      const members = [];
      let userInput;
      while (userInput !== "done") {
          userInput = prompt("Enter the email Id of Users to Add! Type 'done' when you're finished");
          if (userInput !== "done") {
              members.push(userInput);
          }
      }

      const token = localStorage.getItem("token");
      const res = await axios.post("/group/createGroup", { groupName, members }, { headers: { Authorization: token } });
      alert(`${groupName} Created Successfully!`);
      location.reload();
  } catch (error) {
      console.error(error);
  }
}

async function getGroups() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/group/getGroups", {
      headers: { Authorization: token },
    });

    const groupList = document.getElementById('group-list');
    groupList.innerHTML = ""; // Clear the existing list

    res.data.groups.forEach(group => {
      const li = document.createElement('li');
      li.classList.add('group-item');
      li.setAttribute('data-group-id', group.ID);
      li.setAttribute('data-group-name', group.GroupName);

      const groupName = document.createElement('div');
      groupName.classList.add('group-name');
      groupName.appendChild(document.createTextNode(group.GroupName));

      const adminInfo = document.createElement('div');
      adminInfo.classList.add('admin-info');
      adminInfo.appendChild(document.createTextNode(`${group.Admin} is Admin`));

      li.appendChild(groupName);
      li.appendChild(adminInfo);

      li.addEventListener('click', async (event) => {
        document.getElementById('user-list').innerhtml=''
        groupId = event.currentTarget.getAttribute('data-group-id'); // Update the group ID
        try {
          const groupName = event.currentTarget.getAttribute('data-group-name');
          document.getElementById('active-group-id').value = groupId;
          document.getElementById('group-name-header').textContent = groupName; // Set the group name in the header
          await getAllMessage(groupId);
        } catch (error) {
          console.error('Error occurred while fetching group chat:', error);
        }
      });

      groupList.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
}
//--------------------------------------
// Function to retrieve old chat from local storage
async function getAllMessage(groupId) {
  try {
    const token = localStorage.getItem('token');
    let lastFetchedChatId = localStorage.getItem(`lastFetchedChatId_${groupId}`) || -1;
    let chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${groupId}`)) || [];

    const response = await axios.get(`/chat/group/${groupId}`, {
      headers: {
        Authorization: token,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      params: { lastFetchedChatId: lastFetchedChatId },
    });

    const chatData = response.data.chat;

    if (chatData.length > 0) {
      const newLastFetchedChatId = chatData[chatData.length - 1].ID; // Assuming ID is used to track chat messages
      localStorage.setItem(`lastFetchedChatId_${groupId}`, newLastFetchedChatId);

      // Save chat data to local storage
      chatHistory.push(...chatData);
      localStorage.setItem(`chatHistory_${groupId}`, JSON.stringify(chatHistory));
    }

    showChat(chatHistory);
  } catch (error) {
    console.error('Error occurred while fetching chat:', error);
  }
}



async function addToGroup() {
  try {
    const memberEmail=prompt('Enter valid email you want to add to group')
    
    const groupId=document.getElementById('active-group-id').value;
     console.log('group id.................',groupId)

    const token = localStorage.getItem('token');

    const response = await axios.post(`/group/${groupId}/addMember`, { email: memberEmail }, {
      headers: {
        Authorization: token
      }
    });
    

    if (response.status === 200) {
      alert(`Member with email ${memberEmail} added to the group.`);
      console.log(`Member with email ${memberEmail} added to the group.`);
      
    }
  } catch (error) {
   alert(error.response.data.message)
    console.error("Error occurred while adding a member to the group:", error);
  }
}






async function deleteFromGroup() {
  try {
    const memberEmail = prompt('Enter the valid email you want to remove from the group');
    const groupId = document.getElementById('active-group-id').value;

    const token = localStorage.getItem('token');

    const response = await axios.post(`/group/${groupId}/deleteMember`, { email: memberEmail }, {
      headers: {
        Authorization: token
      }
    });

    if (response.status === 200) {
      alert(response.data.message)
      console.log(`Member with email ${memberEmail} removed from the group.`);
    }
  } catch (error) {
    alert(error.response.data.message)
    console.error("Error occurred while removing a member from the group:", error);
  }
}
async function displayGroupMembers() {
  try {
    const groupId = document.getElementById('active-group-id').value;
    const token = localStorage.getItem('token');
    const response = await axios.get(`/group/${groupId}/members`, {
      headers: { Authorization: token },
    });

    const { members } = response.data;
    const userList = document.getElementById('user-list');
      userList.innerHTML = ''; // Clear the existing list items

     
      members.forEach(member => {
        const listItem = document.createElement('li');
        listItem.textContent = member.username;
        userList.appendChild(listItem);
      });
   
   
  } catch (error) {
    console.error('Error occurred while fetching group members:', error);
  }
}

async function exitGroup() {
  const groupId = document.getElementById('active-group-id').value;

  const token = localStorage.getItem('token');
  
  await axios.post('/group/exit', { groupId }, {
    headers: {
      Authorization: token,
    }
  })
    .then(response => {
      alert('Group Exited')
      window.location.reload()
      console.log(response.data); 
    })
    .catch(error => {
      console.error('Error occurred while exiting the group:', error);
    });
}

function logout()
{

alert('Log out')
  window.location.href='/'
}









document.addEventListener("DOMContentLoaded", getGroups);

;
setInterval(() => {
  const groupId = document.getElementById('active-group-id').value
  getAllMessage(groupId);
}, 2000);






