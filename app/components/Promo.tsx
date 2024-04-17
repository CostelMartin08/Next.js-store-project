import Image from "next/image"

import lgSvg from './svg/lgSvg.svg';
import smSvg from './svg/smSvg.svg';

export function Promo() {

    return (

        <section className="container">

            <div className='block lg:hidden relative'>

                <Image
                    className='rounded-lg'
                    height={1080}
                    width={1800}
                    quality={100}
                    src={smSvg}
                    alt='SmPromo'>
                </Image>

                <div
                    style={{ top: '89%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    className='absolute w-2/5 z-5 flex flex-col'>
                    <a href="https://balanandrei.ro/" className='text-sm  rounded-full bg-white p-3 text-center'>View now</a>

                </div>

            </div>

            <div className='hidden lg:block relative'>

                <Image
                    className='rounded-lg'
                    height={1190}
                    width={2592}
                    quality={100}
                    src={lgSvg}
                    alt='LgPromo'>
                </Image>

                <div
                    style={{ top: '85%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    className='absolute w-1/6 z-5 flex flex-col'>

                    <a href="https://balanandrei.ro/" className='text-lg rounded-full bg-white p-4 text-center'>View now</a>

                </div>

            </div>

        </section>

    )
}