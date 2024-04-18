import React from 'react';
import '../components/components.css';
import Image from 'next/image';

import img from './photos/demo.jpg';
import svgLg from './svg/smartWatch.svg';
import svgSm from './svg/smartWatchSm.svg';

const Banner = () => {


    return (

        <section className='bg-gray-700'>

            <div className='hidden container h-[35rem] w-full md:flex flex-col py-14'>

                <div className="size-full px-2 relative rounded-lg" >

                    <Image

                        style={{ top: '0', left: '0', zIndex: '2' }}
                        className='absolute object-cover h-full w-full rounded-lg'
                        src={svgLg}
                        width={900}
                        height={900}
                        alt='promoSmartWatch'>

                    </Image>



                    <div
                        style={{ top: '50%', left: '20%', transform: 'translate(-25%, -50%)' }}
                        className='absolute z-10 flex flex-col space-y-10 '>
                        <p className='text-4xl w-72 text-white font-black'>Discover the new collection</p>
                        <span className=' w-36 rounded-full bg-white text-center p-3'>View now</span>

                    </div>

                </div>

            </div>
            <div className='md:hidden container h-[30rem] w-full flex flex-col py-14 '>

                <div className="size-full px-2 relative " >


                    <Image

                        style={{ top: '0', left: '0', zIndex: '2' }}
                        className='absolute object-cover h-full w-full rounded-lg'
                        src={svgSm}
                        width={1080}
                        height={1080}
                        alt='promoSmartWatch'>

                    </Image>

                    <div
                        style={{ top: '50%', left: '27%', transform: 'translate(-25%, -50%)' }}
                        className='absolute h-52 z-10 flex flex-col justify-between '>
                        <p className='text-3xl w-72 text-white font-black'>Discover the new collection</p>
                        <span className=' w-28 rounded-full bg-white text-center  p-2'>View now</span>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Banner;