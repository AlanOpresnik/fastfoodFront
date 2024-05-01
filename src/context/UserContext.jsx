import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("")
  const [user, setUser] = useState([])
  const token = localStorage.getItem("token");

  if (token !== undefined && token !== null && token !== "") {
    useEffect(() => {
      setUserId(jwtDecode(token));
      console.log(jwtDecode(token));
    }, [])
  }

  useEffect(() => {
    if (userId && userId.userId) {
      getUserCart();
    }
  }, []);

  useEffect(() => {
    if (token != "" || token != undefined) {
      const name = localStorage.getItem("name");
      setName(name);
      console.log(name);
    }
  }, []);




  const CreateUser = async (name, lastName, email, password) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_REGISTER,
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
        import.meta.env.VITE_API_LOGIN,
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
          window.location.href = "/#/";
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

  const getUserCart = async () => {
    try {
      const res = await axios.get(`https://zapatillasapi.site/api/auth/getUserById/${userId.userId}`)
      setCart(res.data.cart)
      setUser(res.data)
    }
    catch (error) {
      console.log(error)
    }
  };


  const addToCart = async (id) => {

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_ADD_CART,
        {
          userId: userId.userId,
          productId: id,
          quantity: 1,
        }
      );
      console.log(res);
      await getUserCart()
      if (res.status == 200) {
        toast.success("Producto agregado al carrito");
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const removeFromCart = async (id) => {

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_REMOVE_CART, {
        userId: userId.userId,
        productId: id,
      }
      );
      await getUserCart()
    } catch (error) {
      console.log(error)
    }
  }


  const updateUser = async (updatedData) => {
    try {
      const res = await axios.put(
        ` ${import.meta.env.VITE_API_UPDATE_USER}/${userId.userId}`,
        updatedData
      );
      setUser(res.data)
      if (res.status == 200) {
        toast.success("Usuario actualizado con exito");
        localStorage.setItem("name", res.data.name);

      }
    } catch (error) {
      toast.error("Error al actualizar el usuario");
    }

  }

  


  return (
    <UserContext.Provider
      value={{ LoginUser, handleLogin, CreateUser, handleRegister, getUserCart, cart, addToCart, userId, removeFromCart, token, name, user, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
