import Image from "next/image"

import svg from './balanandre.ro.svg';


export function Promo() {


    return (

        <section>

            <div

                className='container relative flex flex-col justify-center items-center'>


                <Image
                    className=' rounded-lg'
                    height={900}
                    quality={100}
                    src={svg}
                    alt='promo'>
                </Image>

                <div
                    style={{ top: '85%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    className='absolute w-1/4  lg:w-1/6  z-10 flex flex-col space-y-10 '>

                    <a href="https://balanandrei.ro/" className='text-sm md:text-lg rounded-full bg-white lg:p-4 text-center p-2'>View now</a>

                </div>

            </div>

        </section>



    )
}