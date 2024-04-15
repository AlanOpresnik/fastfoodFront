import React, { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const CreateUser = async (name, lastName, email, password) => {
    try {
      const res = await axios.post(
        "https://fastfoodbackend-xyjo.onrender.com/api/auth/register",
        {
          name: name,
          lastName: lastName,
          email: email,
          password: password,
        }
      );
      console.log(res);
      if (res.status === 201) {
        toast.success(
          "Cuenta creada correctamente, te estamos redirigiendo..."
        );
        setTimeout(() => {
          window.location.href = "/#/login";
        }, 1000);
      }
    } catch (error) {
      toast.error("Error al registrar el usuario");
      console.log(error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    await CreateUser(name, lastName, email, password);
  };

  const LoginUser = async (email, password) => {
    try {
      const res = await axios.post(
        "https://fastfoodbackend-xyjo.onrender.com/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(res);
      if (res.status == 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name); //TODO ponder el name
        toast.success("Usuario ingresado con exito");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      toast.error("Error al iniciar sesion");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    await LoginUser(email, password);
  };

  return (
    <UserContext.Provider
      value={{ LoginUser, handleLogin, CreateUser, handleRegister }}
    >
      {children}
    </UserContext.Provider>
  );
};
