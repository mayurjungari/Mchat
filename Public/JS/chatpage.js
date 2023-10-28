document.getElementById('send-button').onclick = async function() {
  const message = document.getElementById('message-input').value;
  console.log(message)
  const groupId = document.getElementById('active-group-id').value;
  console.log(groupId)
  const token = localStorage.getItem('token');

  try {
      const response = await axios.post('/savechat', { message, groupId }, {
          headers: {
              'Authorization': token
          }
      });

      if (response.status === 200) 
          document.getElementById('message-input').value = '';
  } catch (error) {
      console.log(error);
  }
};

function showChat(chatArray) {
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
async function getAllMessage(groupId) {
  try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`/chat/group/${groupId}`, {
          headers: {
              Authorization: token
          }
      });

      const chatData = response.data.chat;
      console.log(response)
      showChat(chatData);
  } catch (error) {
      console.error("Error occurred while fetching chat:", error);
  }
}


document.addEventListener("DOMContentLoaded", getGroups);

window.addEventListener('load', () => {
  setInterval(() => {
    const groupId = document.getElementById('active-group-id').value;
    getAllMessage(groupId);
  }, 3000); 
});
