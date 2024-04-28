import React from 'react'
import { Link } from 'react-router-dom'

const DividerLooks = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center mt-12 gap-2 px-4'>
            <Link>
                <img className='w-full h-full md:h-[900px]' src='/look1.webp' />
                <p className='text-2xl text-center md:text-start py-4'>Lokeate con Jordan</p>
            </Link>
            <Link>
                <img className='w-full h-full md:h-[900px]' src='/look2.webp' />
                <p className='text-2xl text-center md:text-start py-4'>Air Force</p>
            </Link>

        </div>
    )
}

export default DividerLooks