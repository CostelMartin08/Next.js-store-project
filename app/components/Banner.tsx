import React from 'react';
import '../components/components.css';
import Image from 'next/image';

import img from '../../public/appPhoto/GalaxyPromo.svg';
import imgSm from '../../public/appPhoto/GalaxyPromoSm.svg';
import svgLg from './svg/smartWatch.svg';
import svgSm from './svg/smartWatchSm.svg';
import Link from 'next/link';

const Banner = () => {


    return (

        <section style={{ backgroundColor: 'rgb(26 26 26)' }} className=''>

            <div className='hidden container h-[45rem] w-full md:flex flex-col py-14'>

                <div className="size-full px-2 relative " >

                    <Image
                        style={{ top: '0', left: '0', zIndex: '2' }}
                        className='absolute object-cover h-full w-full rounded-md'
                        src={img}
                        width={900}
                        height={900}
                        alt='promo'>
                    </Image>



                    <div
                        style={{ top: '50%', left: '20%', transform: 'translate(-25%, -50%)' }}
                        className='absolute z-10 flex flex-col space-y-10 '>
                        <p className='text-4xl w-72 text-white font-black'>Galaxy S24 a partner for excellence every day</p>
                        <Link href='/collections/category?category=smartphones' className=' w-36 rounded-full bg-white text-center p-3'>View now</Link>

                    </div>

                </div>

            </div>
            <div className='md:hidden container h-[30rem] w-full flex flex-col py-14 '>

                <div className="size-full px-2 relative " >


                    <Image

                        style={{ top: '0', left: '0', zIndex: '2' }}
                        className='absolute object-cover h-full w-full rounded-lg'
                        src={imgSm}
                        width={1080}
                        height={1080}
                        alt='promo'>

                    </Image>

                    <div
                        style={{ top: '45%', left: '27%', transform: 'translate(-25%, -50%)' }}
                        className='absolute h-52 z-10 flex flex-col justify-between '>
                        <p className='text-2xl w-72 text-white font-black'>Galaxy S24 a partner for excellence every day</p>
                        <span className=' w-28 rounded-full bg-white text-center  p-2'>View now</span>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Banner;