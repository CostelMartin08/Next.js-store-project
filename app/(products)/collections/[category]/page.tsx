'use client'

import { getProducts } from '@/app/actions/products';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Product } from '@/app/data/products';

import './products.css';

import OneProduct from '../../components/product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons/faSliders';


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
                    setData(data as any);
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

            <section className='container mx-auto px-6 lg:px-10'>

                <div className='text-center'>

                    <h4 className='text-[50px]'>{letterCapitalized}</h4>

                </div>

                <div className='grid grid-cols-1 lg:grid-cols-[250px_minmax(650px,_1fr)]'>


                    <div className='my-16 hidden lg:block'>

                        <div className='inline-flex items-center text-[24px]'>
                            <FontAwesomeIcon className='px-3' icon={faSliders} />
                            <p className=' text-bolt'>Filter</p>

                        </div>

                        <ul className='px-3 flex justify-left flex-col  space-y-7 pt-5 text-[24px]'>
                            <li>Price</li>
                            <li>Product Type</li>
                            <li>Mark</li>
                            <li>Model</li>
                            <li>Compatibility</li>
                        </ul>

                    </div>

                    <div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : data ? (
                            <div className='grid grid-cols-2 md:grid-cols-3  gap-4 my-16 mx-auto'>
                                <OneProduct category={category || ""} data={data} />
                            </div>
                        ) : (
                            <p>No products found</p>
                        )}

                    </div>

                </div>

            </section>
        </>
    )
}

export default CategoryPage;

