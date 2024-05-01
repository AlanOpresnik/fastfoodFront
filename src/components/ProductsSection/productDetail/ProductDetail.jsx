import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../../context/ProductContext';
import { formatName } from '../../../helpers/formatUrl';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import ProductDetailInfoSide from './ProductDetailInfoSide';
import { UserContext } from '../../../context/UserContext';


const ProductDetail = () => {
    const params = useParams();
    const { product, getProductById, loading } = useContext(ProductContext);
    const { id } = useParams()
    
    // Hacer una solicitud cuando cambie el ID en la URL
    useEffect(() => {
        getProductById(id);
    }, [id]);
    const [activeThumb, setActiveThumb] = useState();

 

    useEffect(() => {
        getProductById(params.id);
    }, []);

    if (loading || !product) {
        return <div>Loading...</div>;
    }

    

    return (
        <div className='flex-col md:flex-row flex mt-2'>
            <div>


                <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation, Thumbs]}
                    grabCursor={true}
                    thumbs={{ swiper: activeThumb }}
                    className='max-w-[600px] md:max-w-[400px] lg:max-w-[600px] mt-2'
                >
                    {product.images.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='max-w-[600px]'>
                                <img className=' md:max-w-[400px]  lg:max-w-[600px] w-full max-h-[570px]' src={item.secure_url} alt="product images" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    onClick={setActiveThumb}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    modules={[Navigation, Thumbs]}
                    className=' hidden md:block max-w-[600px] mt-4'
                >
                    {product.images.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='hidden md:block max-w-[700px] '>
                                <img className='max-w-[140px]' src={item.secure_url} alt="product images" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div>
                <ProductDetailInfoSide product={product} />
            </div>
        </div>
    );
};

export default ProductDetail;
