'use client'

import { getProductsById, getProductsByName } from '@/app/actions/products';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PhotoProduct from '../../components/photoProduct';
import Link from 'next/link';

import { CartProduct } from '@/app/types';
import { Product } from '@/app/types';
import { useAppContext } from '@/app/context';
import { useCurrentUser } from '@/hooks/use-current-user';

const ProductPage = () => {

    const { setState } = useAppContext();
    const param = useSearchParams();
    const name = param.get('q2') as string;
    const category = param.get('q1') as string;
    const decodedName = decodeURIComponent(name) as string;

    const [data, setData] = useState<Product | null>(null);

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [clicked, setClicked] = useState<boolean>(false);

    const router = useRouter();

    const user = useCurrentUser()


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
    }, [param, category, decodedName]);




    const addProduct = (id: string) => {

        if (!user) {

            return router.push('/auth/signIn');
        }

        getProductsById(category, id)
            .then((productData) => {

                const product = productData as Product;

                const cartProduct: CartProduct = {
                    ...product,
                    count: 1,
                    category: category,
                    countPrice: data?.price as number,
                    unitsSold: 0
                };

                const cartItems: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');

                const existingItemIndex = cartItems.findIndex(item => item.id === cartProduct.id);

                if (existingItemIndex !== -1) {

                    setSuccess("You already have this product in your cart!");
                } else {

                    cartItems.push(cartProduct);
                    setState(cartItems)

                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    setSuccess('Your product added in your cart!');

                }
                setClicked(true);
            })
            .catch((error) => {
                console.error(`Error: ${error}`)
                setError(`Error: ${error}`)
            })


    };

    return (


        <section className=" container setappend mx-auto mt-10 text-white">

            {data ? (

                <div className="grid grid-cols-1 lg:grid-cols-2 p-5 bg-white rounded-md">

                    <PhotoProduct data={data} />

                    <div className="grid  gap-3 mt-10 lg:mt-0  content-between xl:content-evenly">

                        {
                            error &&
                            <>
                                <div className='bg-red-700 h-8 w-max rounded flex items-center text-center'>
                                    <h2 className=' px-3'>Error: {error}</h2>
                                </div>
                            </>
                        }
                        {
                            success &&
                            <>
                                <div className='bg-green-700 h-8 w-max rounded flex items-center text-center'>
                                    <h2 className=' px-3'>{success}</h2>
                                </div>
                            </>
                        }

                        <div className="space-y-4 lg:w-3/4">


                            <h2 className="text-base md:text-xl lg:text-3xl text-black font-black">{data.name}</h2>

                            <p className="pt-2 text-left text-sm md:text-lg clr-gray">
                                {data.description}

                            </p>

                        </div>

                        <div className="space-y-5">

                            <div className="flex space-x-5 items-center relative">
                                {data.discount > 0 ?
                                    <span className="text-black text-lg md:text-2xl font-black">{data.discountPrice}€</span>
                                    :
                                    <span className="text-black text-lg md:text-2xl font-black">{data.price}€</span>
                                }

                                {data?.stock == 0 &&
                                    <div className='bg-black px-4 p-2 rounded-lg'>
                                        <span className=''>Sold out</span>
                                    </div>}

                                {data.discountPrice > 0 && data.stock > 0 &&
                                    <div className='bg-red-500 p-2 rounded-lg'>
                                        <span className='px-5'>{data.discount}%</span>
                                    </div>}
                            </div>
                            {data.discount > 0 ?
                                <div>
                                    <span className="clr-gray text-black text-lg md:text-xl font-black line-through">{data.price}€</span>
                                </div>
                                : null}
                        </div>

                        <div className="flex">

                            {data?.stock !== 0 ?
                                <button
                                    onClick={() => addProduct(data?.id)}
                                    className={`w-full py-2 md:w-2/4 py-4 rounded-md flex items-center justify-center ${clicked ? 'bg-indigo-800' : 'bg-orange'
                                        }`}>

                                    <FontAwesomeIcon className='px-3' icon={faCartShopping} />
                                    {success ?

                                        <Link href="/shoppingCart">View Cart Now</Link> : 'Add to cart'}

                                </button>
                                :
                                <button className='w-3/4 md:w-2/4 bg-indigo-800  py-4 rounded-md flex items-center justify-center'>Sold Out</button>

                            }

                        </div>

                    </div>

                </div>

            )
                :

                <div className="grid grid-cols-1 p-5 pulse">

                    <div className="flex flex-col md:flex-row justify-between bg-neutral-300 h-full pulse rounded-xl p-8 gap-4">

                        <div className='w-full md:w-1/2 flex flex-col items-center '>

                            <div className="bg-neutral-400/50 h-[250px] w-full md:w-[300px] md:h-[300px] lg:h-[400px] lg:w-[400px] pulse rounded-lg"></div>
                            <div className='flex gap-5 py-5 px-5 w-full md:w-[300px] lg:w-[400px] justify-center'>
                                <div className='bg-neutral-400/50  h-20 w-20 rounded-lg'></div>
                                <div className='bg-neutral-400/50  h-20 w-20 rounded-lg'></div>
                                <div className='bg-neutral-400/50  h-20 w-20 rounded-lg'></div>
                                <div className='bg-neutral-400/50  h-20 w-20 rounded-lg'></div>
                            </div>

                        </div>

                        <div className="md:w-1/2 flex  flex-col gap-6 md:gap-2 justify-between md:pb-10">

                            <div className="bg-neutral-400/50 w-full h-12 pulse rounded-md"></div>
                            <div className="bg-neutral-400/50 w-3/4 h-44 pulse rounded-md"></div>
                            <div className="bg-neutral-400/50 w-1/5 h-12  pulse rounded-md"></div>
                            <div className="bg-neutral-400/50 w-2/4 h-16 pulse rounded-md"></div>

                        </div>
                    </div>
                </div>
            }

        </section>

    )
}


export default ProductPage;