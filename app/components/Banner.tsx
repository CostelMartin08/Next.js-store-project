import React from 'react';
import '../components/components.css';
import Image from 'next/image';
import img from './demo.jpg';


const Banner = () => {


    return (

        <section className='bg-gray-700'>

            <div

                className='container h-[35rem] w-full flex flex-col py-14'>




                <div

                    className="size-full px-2 relative rounded-lg" >

                    <Image
                        style={{ top: '0', left: '0', zIndex: '2' }}
                        className='absolute object-cover h-full w-full rounded-lg'
                        src={img}
                        width={900}
                        height={900}
                        alt='a'>

                    </Image>


                    <div
                        style={{ top: '50%', left: '20%', transform: 'translate(-25%, -50%)' }}
                        className='absolute z-10 flex flex-col space-y-10 '>
                        <p className='text-4xl text-white font-black'>New Product</p>
                        <span className=' w-28 rounded-full bg-white text-center p-2'>View now</span>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Banner;