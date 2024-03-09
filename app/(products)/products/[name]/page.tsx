'use client'

import { getProductsById, getProductsByName } from '@/app/actions/products';
import { Product } from '@/app/data/products';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

import PhotoProduct from '../../components/photoProduct';


export interface CartProduct extends Product {
    count: number;
    category: string;
}

const ProductPage = () => {

    const param = useSearchParams();
    const name = param.get('q2') as string;
    const category = param.get('q1') as string;
    const decodedName = decodeURIComponent(name) as string;
    const [data, setData] = useState<Product | null>(null);
    const [count, setCount] = useState<number>(1);



    useEffect(() => {

        if (category) {

            getProductsByName(category, decodedName)
                .then((data) => {
                    setData(data as Product)
                })
                .catch((error) => {
                    console.log(error)
                });

        }
    }, []);

    let stock = data?.stock as number;

    const increment = (): void => {

        if (stock >= 1) {

            if (count <= stock - 1) {
                setCount(prevCount => prevCount + 1);
            }
        }
    };

    const decrement = (): void => {

        if (stock >= 1) {
            if (count >= 2) {
                setCount(prevCount => prevCount - 1);
            } else {
                setCount(1);
            }
        }

    };

    const addProduct = (id: string) => {

        getProductsById(category, id)
            .then((productData) => {

                const product = productData as Product;

                const cartProduct: CartProduct = {
                    ...product,
                    count: count,
                    category: category
                };

                const cartItems: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');


                const existingItemIndex = cartItems.findIndex(item => item.id === cartProduct.id);

                if (existingItemIndex !== -1) {

                    cartItems[existingItemIndex].count += count;

                } else {

                    cartItems.push(cartProduct);
                }

                localStorage.setItem('cart', JSON.stringify(cartItems));
            })
            .catch((error) => {
                console.error(`Error: ${error}`)
            })
    };

    return (

        <section className="container setappend mx-auto">

            {data && (

                <div className="grid grid-cols-1 lg:grid-cols-2  p-5">

                    <PhotoProduct data={data} />

                    <div className="grid grid-row-5 gap-3 mt-10 lg:mt-0  content-between xl:content-evenly">

                        <div className="space-y-3 lg:w-3/4">


                            <h2 className="font-lg ">{data.name}</h2>

                            <p className="font-md pt-5 md:w-3/4 text-left clr-gray">
                                These low-profile sneakers are you perfect casual wear companion.
                                Featuring a durable rubber sole, they`ll withstand everything the
                                weather can offer.
                            </p>

                        </div>

                        <div className="space-y-5 ms-3">

                            <div className="flex space-x-5 items-center">
                                <span className="font-lg">${data.price}</span>
                                <div className='bg-black text-white px-4 p-2 rounded-lg'>
                                    <span className='text-[11px] md:text-[13px] font-bold'>Sold out</span>
                                </div>
                                <div className='span bg-red-500 text-white p-2 rounded-lg'>
                                    <span className='text-[11px] md:text-[13px] font-bold'>-26%</span>
                                </div>
                            </div>

                            <div>
                                <span className="font-md clr-gray line-through">$250.00</span>
                            </div>

                        </div>

                        <div className="flex space-x-6">

                            <div className="increment bg-slate-100 w-1/4 text-center flex items-center">
                                <FontAwesomeIcon onClick={decrement} className="cursor-pointer w-1/3 clr-primary text-center" icon={faMinus} />
                                <p className='w-1/3'>{count}</p>
                                <FontAwesomeIcon onClick={increment} className=" cursor-pointer w-1/3 my-auto clr-primary text-center" icon={faPlus} />
                            </div>

                            <button
                                onClick={() => addProduct(data?.id)}
                                className=" w-3/4 md:w-2/4 bg-orange text-white rounded-md flex items-center justify-center">
                                <FontAwesomeIcon className='px-3' icon={faCartShopping} />
                                Add to cart
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </section>

    )
}


export default ProductPage;