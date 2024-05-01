import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { jwtDecode } from "jwt-decode";


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [orderId, setOrderId] = useState("")
  const [order, setOrder] = useState([])
  const [preferenceId, setPreferenceId] = useState(null)
  const { userId } = useContext(UserContext)
  const [totalToken, setTotalToken] = useState('')

  const getProducts = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_GET_PRODUCTS);
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  const getProductById = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_GET_PRODUCT_BY_ID}${id}`);
      setProduct(res.data);
      console.log(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const createPreference = async (price, products, formData) => {
    try {
      const res = await axios.post('https://zapatillasapi.site/mp/create_preference', {
        products: products,
        price: price,
        name: formData.name,
        quantity: 1,
        cp: formData.cp,
        dni: formData.dni,
        payment_method: formData.paymentMethod,
        shipping_method: formData.shippingMethod,
        userId: userId.userId,
        userEmail: formData.email,

      });
      console.log(res)
      const { id } = res.data.result
      setOrderId(localStorage.setItem('orderId', res.data.result.external_reference));
      window.location.href = res.data.result.init_point
      return id
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuy = async (e, price, products, formData) => {
    e.preventDefault()
    const id = await createPreference(price, products, formData)
    if (id) {
      setPreferenceId(id)
    }
  }

  const getOrderById = async (id) => {
    try {
      const res = await axios.get(`https://zapatillasapi.site/mp/getOrderById/${id}`)
      setOrder(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleRedirect = async (total, products) => {
    try {
      // Convertir el total a cadena de texto
      const totalAsString = total.toString();

      const res = await axios.post(`https://zapatillasapi.site/mp/getToken`, {
        total: totalAsString
      });

      // Asumiendo que `res.data.token` es el token JWT completo
      const token = res.data.token;
      localStorage.setItem('products', JSON.stringify(products));
      // Guardar el token en localStorage
      localStorage.setItem('totalToken', token);

      console.log(token);
      window.location.href = '/#/cart/finishForm';
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ProductContext.Provider
      value={{ products, getProducts, getProductById, product, loading, preferenceId, handleBuy, getOrderById, order, orderId, handleRedirect, totalToken }}
    >
      {children}
    </ProductContext.Provider>
  );
}