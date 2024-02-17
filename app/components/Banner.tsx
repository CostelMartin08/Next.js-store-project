import React from 'react';
import '../components/components.css';


const Banner = () => {


    return (

        <section className='bg-gray-700'>

            <div className='container mx-auto banner-section'>

                <div className='product-banner flex flex-col m-5 lg:p-10'>

                    <span className='font-md'>Produs nou</span>

                    <h2 className='font-lg'>Prezintă cele mai interesante produse aici!</h2>

                    <button className='banner-button font-sm'>Cumpara acum</button>

                </div>

            </div>

        </section>
    )
}

export default Banner;