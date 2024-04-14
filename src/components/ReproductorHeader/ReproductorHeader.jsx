import React from 'react'
import ReactPlayer from 'react-player'

const ReproductorHeader = () => {
    return (
        <header>
            <div className=" h-auto md:h-[500px] mt-4 ">
                <ReactPlayer
                    url='/Zapatillas.mp4'
                    className='react-player '
                    autoplay
                    controls
                    playing
                    volume={0.5}
                    width='100%'
                    height='100%'
                />
            </div>
        </header>
    )
}

export default ReproductorHeader