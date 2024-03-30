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
    }, []);




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
                    countPrice: data?.price as number
                };

                const cartItems: CartProduct[] = JSON.parse(sessionStorage.getItem('cart') || '[]');

                const existingItemIndex = cartItems.findIndex(item => item.id === cartProduct.id);

                if (existingItemIndex !== -1) {

                    setSuccess("You already have this product in your cart!");
                } else {

                    cartItems.push(cartProduct);
                    setState(cartItems)

                    sessionStorage.setItem('cart', JSON.stringify(cartItems));
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

        <section className="container setappend mx-auto text-md text-white">

            {data && (

                <div className="grid grid-cols-1 lg:grid-cols-2 p-5">

                    <PhotoProduct data={data} />

                    <div className="grid grid-row-5 gap-3 mt-10 lg:mt-0  content-between xl:content-evenly">

                        {
                            error &&
                            <>
                                <div className='bg-red-700 h-8 w-max rounded flex items-center text-center'>
                                    <h2 className=' px-3'>Eroare: {error}</h2>
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


                            <h2 className="font-lg text-black font-black text-2xl ">{data.name}</h2>

                            <p className="pt-2 text-left clr-gray">
                                These low-profile sneakers are you perfect casual wear companion.
                                Featuring a durable rubber sole, they`ll withstand everything the
                                weather can offer.
                            </p>

                        </div>

                        <div className="space-y-5 ms-3">

                            <div className="flex space-x-5 items-center relative">

                                <span className="text-black">${data.price}</span>
                                {data?.stock == 0 &&
                                    <div className='bg-black px-4 p-2 rounded-lg'>
                                        <span className=''>Sold out</span>
                                    </div>}
                                {data.discountPrice > 0 &&
                                    <div className='bg-red-500  p-2 rounded-lg'>
                                        <span className=' '>-26%</span>
                                    </div>}
                            </div>

                            <div>
                                <span className="font-md clr-gray line-through">$250.00</span>
                            </div>

                        </div>

                        <div className="flex">

                            {data?.stock !== 0 ?
                                <button
                                    onClick={() => addProduct(data?.id)}
                                    className={`w-3/4 md:w-2/4 py-4 rounded-md flex items-center justify-center ${clicked ? 'bg-indigo-800' : 'bg-orange'
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

            )}

        </section>

    )
}


export default ProductPage;