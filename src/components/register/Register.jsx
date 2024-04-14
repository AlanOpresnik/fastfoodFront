import axios from "axios";
import React from "react";

const CreateUser = async (name, lastName, email, password) => {
  try {
    const res = await axios.post('https://fastfoodbackend-xyjo.onrender.com/api/auth/register', {
      name: name,
      lastName: lastName,
      email: email,
      password: password
    });
    console.log(res);
    if (res.status === 201) {
      alert("Usuario creado correctamente");
      window.location.href = "/login";
    }
  } catch (error) {
    console.log(error);
  }
}

function Register() {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    await CreateUser(name, lastName, email, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="text" name="email" placeholder="Email" />
        <input type="text" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Register;
