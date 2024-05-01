import { Button } from "@mui/material";
import { MenuIcon, SearchIcon, ShoppingBagIcon } from "lucide-react";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import SwiperNavbar from "./Swiper/SwiperNavbar";
import DrawerNavb from "../Drawer/DrawerNavb";
import { useDebounce } from "@uidotdev/usehooks";
import { PersonOutlineRounded } from "@mui/icons-material";
import DraweCart from "../Drawer/DraweCart";
import axios from "axios";

import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { UserContext } from "../../context/UserContext";
import { formatUrl } from '../../helpers/formatUrl';
const Navbar = () => {
  const [mobile, setisMobile] = useState(false);
  const { user } = useContext(UserContext)
  const [name, setName] = useState("");
  const [token, setToken] = useState("")
  const [search, setSearch] = useState("")
  const debouncedSearchTerm = useDebounce(search, 300);
  const [productsSearch, setProductsSearch] = useState([])
  const [showBackdrop, setShowBackdrop] = useState(false); // Estado para controlar la visibilidad del fondo oscuro
  const [isActive, setIsActive] = useState(false)
  const navbarRef = useRef(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token != "" || token != undefined) {
      const name = localStorage.getItem("name");
      setName(name);
      console.log(name);
    }

    if (window.innerWidth < 768) {
      setisMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);


  useEffect(() => {
    const handleDebouncedSearch = async () => {
      try {
        const res = await axios.get(`https://zapatillasapi.site/api/products/search/?q=${debouncedSearchTerm}`);
        setProductsSearch(res.data.products);
        setShowBackdrop(true);
      } catch (error) {
        console.log(error);
      }
    };

    handleDebouncedSearch();
  }, [debouncedSearchTerm]);



  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = () => {
    setShowBackdrop(false)
    setProductsSearch([])
    setSearch("")
    setIsActive(false);


  }
  const toggleInputWidth = () => {
    setIsActive(true);
  };




  return (
    <div ref={navbarRef}>
      {showBackdrop && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={handleChange} // Ocultar el fondo oscuro al hacer clic en él
        ></div>
      )}
      <div className="bg-[#F5F5F5] px-7 flex items-center justify-between py-3">
        <img
          className="w-[25px]"
          src="https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/f97c1ee4-0e66-4225-b378-f4ae7d491bc7___39627060035c5a0d813f57675cef86ea.svg"
        />
        <nav>
          <ul className="flex text-xs text-black font-semibold items-center">

            {token != null && token != "" ? (
              <Link to={'/user/panel'} className="flex cursor-pointer items-center">
                <PersonOutlineRounded fontSize="small" />
                <p className="mr-3 border-r cursor-pointer border-black pr-3">Hola, {user.name}</p> {/*todo: hacer el panel de cuenta*/}
              </Link>

            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="border-r border-black pr-3 hover:text-gray-900"
                  >
                    Iniciar sesion{" "}
                  </Link>
                </li>
                <li className="mr-3">
                  <Link
                    to="/register"
                    className="border-r border-black pr-3 hover:text-gray-900"
                  >
                    Registrarse{" "}
                  </Link>
                </li>
              </>
            )}
            <li className="mr-3">
              <Link href="#" className=" pr-3 hover:text-gray-900">
                ayuda{" "}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <nav className="flex justify-between px-0 md:px-6  items-center  py-4">
          {mobile ? (
            <>
              <DrawerNavb />
              <Link to={'/'} className="flex w-full justify-center ml-16">
                <img
                  className="w-[70px] justify-center mr-4"
                  src="https://nikearprod.vtexassets.com/assets/vtex/assets-builder/nikearprod.store/2.0.63/icons/Assets_for_off%20platform/swoosh___33f7ffaf2fc124733c2c4a60a12a1160.svg"
                />
              </Link>
            </>
          ) : (
            <>
              <Link to={'/'} className="flex  gap-2">
                <img
                  className="w-[70px] justify-center mr-4"
                  src="https://nikearprod.vtexassets.com/assets/vtex/assets-builder/nikearprod.store/2.0.63/icons/Assets_for_off%20platform/swoosh___33f7ffaf2fc124733c2c4a60a12a1160.svg"
                />
              </Link>
            </>
          )}
          <div
            className={`
                    ${mobile ? "hidden" : "flex"}
                    flex gap-4 text-md xl:ml-24 justify-center items-center
                    `}
          >
            <Link className="hover:underline">Destacados</Link>
            <Link className="hover:underline">Hombre</Link>
            <Link className="hover:underline">Mujer</Link>
            <Link className="hover:underline">Niño/a</Link>
            <Link className="hover:underline">Accesorios</Link>
            <Link className="hover:underline">Oportunidades</Link>
          </div>
          <div className="flex items-center gap-0 md:gap-4">
            <div
              className={`flex items-center rounded-full border ${mobile ? "border-none bg-transparent mr-0" : ""
                } border-gray-300 bg-gray-100/30 px-0 md:px-3.5 py-[0.35rem] w-full max-w-[200px]`}
            >
              <SearchIcon onClick={toggleInputWidth} className="h-4 w-4 mr-0 md:mr-2.5" />
              <input
                onChange={handleSearch}
                onClick={toggleInputWidth}
                className={`bg-transparent h-[30px] ${mobile ? "w-0 " : "block w-[120px] visible"
                  } focus:outline-none   md:placeholder:text-sm w-full border-none flex-1 transition-all ${isActive ? "visible w-[80px]" : " w-0" // Aplicar el ancho de 60px cuando isActive es true
                  }`}
                placeholder="Buscar"
                type="search"
                value={search}
              />
            </div>
            <Button

              sx={{
                color: "black",
              }}
            >
              <DraweCart />
            </Button>
          </div>
        </nav>
      </div>
      <div className="bg-[#f5f5f5]">
        <SwiperNavbar />
      </div>
      {productsSearch.length > 0 ? (
        <div className="max-w-[1480px] top-[-120px] md:top-[-30px] md:mx-auto py-2 mx-4  px-6 z-50 rounded-xl bg-white shadow-xl relative">
          <h3 className="mb-4 py-2 text-xl max-w-[280px] font-semibold">Productos relacionados con tu busqueda</h3>
          <div className=" top-0  left-0 right-0 z-50">
            <Swiper
              pagination={true}
              modules={[Pagination]}
              breakpoints={{
                300: {
                  slidesPerView: 1.2,
                  navigation: true
                },
                400: {
                  slidesPerView: 1.2,
                },
                500: {
                  slidesPerView: 1.4,
                },
                660: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2.2,
                },
                820: {
                  slidesPerView: 2.4,
                },
                1022: {
                  slidesPerView: 3,
                },
                1300: {
                  slidesPerView: 4.2,
                },
              }}
              className="flex  w-full !justify-center h-[400px]  z-[999999900] mx-auto"
            >
              {productsSearch?.map(product => (
                <SwiperSlide className="w-full flex ">
                  <Link to={`/product/${formatUrl(product.title)}/${product._id}`} className="">
                    <img className="w-[200px]" src={product.images[0].secure_url} />
                    <span className="font-semibold text-[#FB7633]">{product.isNewProduct ? "Lo nuevo" : ""}</span>
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-sm opacity-70">{product.description}</p>
                    <p className="text-sm font-semibold">${product.price}</p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className=" flex justify-center mt-6 z-50  ">
              <Button sx={{ height: "46px" }} className="!mb-6 !bg-black !rounded-full" variant="contained">Ver todos los {productsSearch.length} productos</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
