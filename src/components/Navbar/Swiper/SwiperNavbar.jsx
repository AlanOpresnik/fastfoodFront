import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";
export default function SwiperNavbar() {
    return (
        <>
            <Swiper
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 3000 }} 
                loop={true}
                className="mySwiper text-center text-sm font-semibold max-w-[500px] !py-4 bg-[#f5f5f5]">
                <SwiperSlide>
                    Ahora 9 CUOTAS SIN INTERÉS en todo el sitio
                    <br />
                    <a className="underline" href="/">ver promociones bancarias</a>
                </SwiperSlide>
                <SwiperSlide>
                    Envío gratis a partir de $215.000
                    <br />
                    <a className="underline" href="">Ver productos</a>
                </SwiperSlide>
                <SwiperSlide>
                    ¡Llega hoy! Comprando antes de las 11hs
                    <br />
                    <a className="underline" href="">Exclusivo CABA y GBA 1</a>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
