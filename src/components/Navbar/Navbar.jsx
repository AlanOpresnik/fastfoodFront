import { Button } from '@mui/material'
import { MenuIcon, SearchIcon, ShoppingBagIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SwiperNavbar from './Swiper/SwiperNavbar'
import DrawerNavb from '../Drawer/DrawerNavb'

const Navbar = () => {
    const [mobile, setisMobile] = useState(false); // Aquí se obtiene el estado y la función para actualizarlo
    useEffect(() => {
        // Esta función se ejecutará una vez, después de que el componente se monte
        if (window.innerWidth < 768) {
            setisMobile(true);
        }
    }, [])
    return (
        <div >
            <div className='bg-[#F5F5F5] px-7 flex items-center justify-between py-3'>
                <img className='w-[25px]' src='https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/f97c1ee4-0e66-4225-b378-f4ae7d491bc7___39627060035c5a0d813f57675cef86ea.svg' />
                <nav>
                    <ul className='flex text-xs text-black font-semibold items-center'>
                        <li className='mr-3'>
                            <a href='#' className='border-r border-black pr-3 hover:text-gray-900'>NewsLetter </a>
                        </li>
                        <li className='mr-3'>
                            <a href='#' className='border-r border-black pr-3 hover:text-gray-900'>Buscar tienda </a>
                        </li>
                        <li className='mr-3'>
                            <a href='#' className=' pr-3 hover:text-gray-900'>ayuda </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <nav className='flex justify-between px-0 md:px-6  items-center  py-4'>
                    {mobile ? (
                        <>
                            <DrawerNavb />
                            <div className='flex w-full justify-center ml-16'>
                                <img className='w-[70px] justify-center mr-4' src='https://nikearprod.vtexassets.com/assets/vtex/assets-builder/nikearprod.store/2.0.63/icons/Assets_for_off%20platform/swoosh___33f7ffaf2fc124733c2c4a60a12a1160.svg' />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex  gap-2'>
                                <DrawerNavb />
                                <img className='w-[70px] justify-center mr-4' src='https://nikearprod.vtexassets.com/assets/vtex/assets-builder/nikearprod.store/2.0.63/icons/Assets_for_off%20platform/swoosh___33f7ffaf2fc124733c2c4a60a12a1160.svg' />
                            </div>
                        </>
                    )}
                    <div className={`
                    ${mobile ? 'hidden' : 'flex'}
                    flex gap-4 text-md xl:ml-24 justify-center items-center
                    `}>
                        <Link className='hover:underline'>Destacados</Link>
                        <Link className='hover:underline'>Hombre</Link>
                        <Link className='hover:underline'>Mujer</Link>
                        <Link className='hover:underline'>Niño/a</Link>
                        <Link className='hover:underline'>Accesorios</Link>
                        <Link className='hover:underline'>Oportunidades</Link>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className={`flex items-center rounded-full border ${mobile ? "border-none bg-transparent mr-0" : ""} border-gray-300 bg-gray-100/30 px-3.5 py-[0.35rem] w-full max-w-[200px]`}>
                            <SearchIcon className="h-4 w-4 mr-0 md:mr-2.5" />
                            <input className={`bg-transparent h-[30px] ${mobile ? "hidden" : "block"} focus:outline-none  placeholder:text-sm   w-full border-none flex-1`} placeholder="Buscar" type="search" />
                        </div>
                        <Button sx={{
                            color: "black"
                        }}>

                            <ShoppingBagIcon />
                        </Button>
                    </div>
                </nav>
            </div>
            <div className='bg-[#f5f5f5]'>
                <SwiperNavbar />
            </div>
        </div>
    )
}

export default Navbar