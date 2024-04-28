import React, { useContext, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from './ProductCard';

export default function ProductCarrusel() {
  const { getProducts, products } = useContext(ProductContext)

  useEffect(() => {
    getProducts();
    console.log(products)
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}

        className="mySwiper h-[500px] md:h-[530px]"
        breakpoints={{
          300: {
            slidesPerView: 1.2,
            navigation:true
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
      >
        {products?.map(product => (
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  );
}
