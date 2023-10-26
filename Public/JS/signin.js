async function signin(event)
{
    event.preventDefault();
    const obj={
     email:document.getElementById('email').value,
     password:document.getElementById('password').value, 
    }
    console.log(obj) 
    try {
        const response = await axios.post('/signin', obj);
      if(response.status===200)
      {
        console.log(response)
        localStorage.setItem('token',response.data.data.token)
         alert('succesfully log in')
     
}
       
        
    } catch (error) {
        if (error.response.status === 401) {
            alert('Incorrect Password');
        } else if (error.response.status === 404) {
            alert('User not found');
        } else {
            alert('An error occurred. Please try again later.');
        }
        console.log(error);
    }

}
