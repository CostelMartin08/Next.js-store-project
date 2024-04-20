'use client'

import { getProducts } from '@/app/actions/products';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Product } from '@/app/types';

import './products.css';

import OneProduct from '../../components/product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons/faSliders';
import Loader from '@/app/components/Loader';



const CategoryPage = () => {


    const param = useSearchParams();
    const category = param.get('category');
    const letterCapitalized = category ? category?.charAt(0).toUpperCase() + category?.slice(1) : category;
    const [data, setData] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {

        if (category) {

            getProducts(category)
                .then((data) => {
                    setData(data as Product[]);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(`Error fetching products ${error}`);
                    setLoading(false);
                });

        }
    }, [category]);

    return (

        <>
            <section className='container py-10'>

                <div className='text-center  py-6'>

                    <h4 className='text-5xl font-black'>{letterCapitalized}</h4>

                </div>

                <div className='grid grid-cols-1 lg:grid-cols-[250px_minmax(650px,_1fr)] gap-4 pt-10'>


                    <div className='hidden lg:block text-md'>

                        <div className='flex items-center font-bold mx-4 py-3 border-b-2'>
                            <FontAwesomeIcon className='px-3' icon={faSliders} />
                            <p className=' text-bolt '>Filter</p>


                        </div>

                        <ul className='px-5 pt-5 flex flex-col justify-left space-y-7 cursor-pointer font-black'>
                            <li>Price</li>
                            <li>Product Type</li>
                            <li>Mark</li>
                            <li>Model</li>
                            <li>Type</li>
                        </ul>

                    </div>

                    <div>
                        {loading ? (

                            <div className='grid grid-cols-2 xl:grid-cols-3 xl:mx-10 gap-2 sm:gap-4'>

                                <Loader />

                            </div>

                        ) : error ? (
                            <p>{error}</p>
                        ) : data ? (
                            <div className='grid grid-cols-2 xl:grid-cols-3 xl:mx-10 gap-2 sm:gap-4'>

                                <OneProduct category={category || ""} data={data} />

                            </div>
                        ) : (
                            <p className='text-lg'>There are no products listed in this category</p>
                        )}

                    </div>

                </div>

            </section>



        </>
    )
}

export default CategoryPage;

