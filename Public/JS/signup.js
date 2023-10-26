async function signup(event)
{
    event.preventDefault();
    const obj={
         email:document.getElementById('email').value,
         name:document.getElementById('name').value,
         phone:document.getElementById('phone').value,
         password:document.getElementById('password').value,

    }
    console.log(obj)
  
    try {
        const response = await axios.post('/signup', obj);
        if(response.status===200)alert('Signup Succesfully')
       
       
    } catch (error) {
       
        console.error(error);
         alert('User already exhist')
    }

}