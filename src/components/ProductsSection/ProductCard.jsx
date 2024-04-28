import React from 'react'
import { Link } from 'react-router-dom'
import { formatUrl } from '../../helpers/formatUrl'

const ProductCard = ({ product }) => {
  
  
  return (
    <Link to={`/product/${formatUrl(product.title)}/${product._id}`}>
      <div className='max-w-[362px] max-h-[362px]'>
        <img className='w-full h-full rounded-lg' src={product.images[0].secure_url} />
      </div>
      <div className='mt-1'>
        <span className=' font-semibold  text-[#fb7633]'>{product.isNewProduct ? "Lo nuevo" : ""}</span>
        <p className='font-semibold pt-1'>{product.title}</p>
        <p className='opacity-60 pt-1 font-semibold'>{product.description}</p>
        <p className='font-bold py-1'>${product.price}</p>
      </div>
    </Link>
  )
}
export default ProductCard