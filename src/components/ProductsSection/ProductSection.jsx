import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../context/ProductContext';
import ProductCarrusel from './ProductCarrusel';

const ProductSection = () => {
    const { getProducts, products } = useContext(ProductContext)

    useEffect(() => {
      getProducts();
      console.log(products)
    }, []);
    return (
        <div>
            <div className='px-2'>
                <ProductCarrusel/>
            </div>
        </div>
    )
}

export default ProductSection