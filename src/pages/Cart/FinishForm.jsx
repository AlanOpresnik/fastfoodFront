import { MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { jwtDecode } from 'jwt-decode';

const FinishForm = () => {
  const [totalToken, setTotalToken] = useState(0)
  const total = localStorage.getItem("totalToken");
  const { handleBuy } = useContext(ProductContext)

  if (total !== undefined && total !== null && total !== "") {
    useEffect(() => {
      setTotalToken(jwtDecode(total));
      console.log(jwtDecode(total));
    }, [])
  }

  const products = JSON.parse(localStorage.getItem("products"));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dni: '',
    cp: '',
    paymentMethod: '',
    shippingMethod: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  





  return (
    <div className="flex items-center justify-center p-12">
      {/* Author: FormBold Team */}
      {/* Learn More: https://formbold.com */}
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={(e) => handleBuy(e,totalToken.total, products, formData)}>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="fName"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Nombre
                </label>
                <input
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id="Name"
                  placeholder="Nombre"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Email
                </label>
                <input
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>


            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="lName"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  DNI
                </label>
                <input
                  value={formData.dni}
                  onChange={handleInputChange}
                  type="Number"
                  name="dni"
                  placeholder="DNI"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Codigo postal
                </label>
                <input
                  value={formData.cp}
                  onChange={handleInputChange}
                  type="number"
                  name="cp"
                  placeholder="Codigo postal"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="guest"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Metodo de pago
            </label>
            <Select
              value={formData.paymentMethod}
              onChange={handleInputChange}
              type="select"
              name="paymentMethod"
              id="guest"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white  text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

            >
              <MenuItem value={'Mercado Pago'}>Mercado Pago</MenuItem>
            </Select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="guest"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Metodo de Envio
            </label>
            <Select
              value={formData.shippingMethod}
              onChange={handleInputChange}
              type="select"
              name="shippingMethod"
              id="guest"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white  text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

            >
              <MenuItem value={'Particular'}>Envio particular</MenuItem>
            </Select>
          </div>
          Productos:
          <div className='flex gap-12 w-full overflow-x-scroll'>
            {products.map(product => (
              <div className='flex w-[900px] items-center gap-2'>
                <div className='w-full'>
                  <img className='min-w-[60px] rounded-xl' src={product.images[0].secure_url} />
                </div>
                <div className='w-[100px] py-6'>
                  <p className='text-xs'>{product.title}</p>
                  <p className='text-xs opacity-70'>{product.color}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex gap-1 pt-1 pb-4 mt-6'>
            <p className='text-xl'>TOTAL DE LA COMPRA: </p><span className='text-xl font-semibold'>${totalToken.total}</span>
          </div>
          <div>
            <button

              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FinishForm