import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Button } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

const ProductDetailInfoSide = ({ product }) => {
    const [active, setActive] = useState(0);
    const [talla, setTalla] = useState(2);
    const { addToCart } = useContext(UserContext);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Función para manejar el evento de touchmove en dispositivos móviles
        function handleTouchMove() {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            const threshold = 30;
            setIsButtonVisible(scrollPosition > threshold);
        }

        // Verificar si es un dispositivo móvil
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsMobile(isMobileDevice);

        // Agregar event listener para el evento de touchmove
        if (isMobileDevice) {
            window.addEventListener('touchmove', handleTouchMove);
        } else {
            // Agregar event listener para el evento de scroll en dispositivos no móviles
            function handleScroll() {
                const scrollPosition = window.scrollY || document.documentElement.scrollTop;
                const threshold = 30;
                setIsButtonVisible(scrollPosition > threshold);
            }
            window.addEventListener('scroll', handleScroll);
        }

    
        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
           
        };
    }, []);






    return (
        <div className='mt-[12px] px-2 md:px-12'>
            <span className=' font-semibold  text-[#fb7633]'>{product.isNewProduct ? "Lo nuevo" : ""}</span>
            <h2 className='text-2xl font-semibold'>{product.title}</h2>
            <p className='mt-[6px]'>{product.description}</p>
            <p className='text-md mt-1 font-bold'>${product.price} <span className='text-sm text-[#fb7633]'>{product.ofert ? "En oferta" : ""}</span></p>
            <div className='flex flex-wrap gap-2 max-w-[300px] mt-2'>
                <img onClick={(e) => setActive(0)} className={` ${active === 0 ? "border-2 border-black" : " "} max-w-[100px] rounded-xl`} src={product.images[0].secure_url} />
                <img onClick={(e) => setActive(1)} className={` ${active === 1 ? "border-2 border-black" : " "} max-w-[100px] rounded-xl`} src={product.images[1].secure_url} />
            </div>
            <Link className='underline flex items-center mt-6 font-bold gap-2'>
                <CreditCardIcon fontSize='large' />
                Conoce las promociones
            </Link>
            <div className='mt-3'>
                <span className=''>Seleccionar Talle(US)</span>
                <div onClick={(e) => setTalla(0)} className={` ${talla === 0 ? "border-2  border-black" : " "} w-fit p-4 mt-2 cursor-pointer hover:border-black border rounded-xl`}>
                    {product.tallas}
                </div>
            </div>
            <div className='mt-6 flex flex-col items-center w-full md:block'>
                {isMobile ? (
                    <div className='bg-white fixed flex justify-center bottom-0 p-2 w-full'>
                        <Button onClick={(e) => addToCart(product._id)} className='  w-[300px] md:!relative !bg-[#111111] md:!w-[206px] lg:!w-[260px] xl:!w-[300px] !py-[0.84rem] !px-4 !rounded-full hover:!opacity-85 !font-semibold !transition-all' variant='contained'>Agregar al Carrito</Button>
                    </div>
                ) : (

                    <Button onClick={(e) => addToCart(product._id)} className='  w-[300px] md:!relative !bg-[#111111] md:!w-[206px] lg:!w-[260px] xl:!w-[300px] !py-[0.84rem] !px-4 !rounded-full hover:!opacity-85 !font-semibold !transition-all' variant='contained'>Agregar al Carrito2</Button>

                )}
                <p className=' font-semibold mt-6 text-[#fb7633]'>{product.limitedProduct ? "Producto limitado" : ""}</p>
            </div>
        </div>
    );
};

export default ProductDetailInfoSide;