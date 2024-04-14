import axios from 'axios';
import React from 'react'


const LoginUser = async ( email, password) => {
  try {
    const res = await axios.post('https://fastfoodbackend-xyjo.onrender.com/api/auth/login', {

      email: email,
      password: password
    });
    console.log(res);
    if (res.status === 201) {
      alert("Usuario loageado correctamente");
    }
  } catch (error) {
    console.log(error);
  }
}



const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    await LoginUser( email, password);
  };
  return (
    <div>
        <h1 className='text-3xl'>LOGIN</h1>

        <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" />
        <input type="text" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login