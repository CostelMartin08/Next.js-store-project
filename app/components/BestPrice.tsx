"use client"

import { useEffect, useState } from "react";
import { ProductData } from "../(products)/components/product";
import { getAllProductsInAllCategories } from "../actions/products";

import Link from "next/link";
import Image from "next/image";

export default function BestPrice() {

    const [data, setData] = useState<ProductData[]>([])

    useEffect(() => {


        getAllProductsInAllCategories()
            .then((res) => {

                if (res.success) {
                    let productsWithDiscount = res.success.filter((element) => element.discountPrice > 0 && element.stock > 0);
                    setData(productsWithDiscount as unknown as ProductData[]);
                }
            })
            .catch((error) => {
                console.log(error)
            });


    },[]);


    return (

        <section className="container mb-5">

            <h6 className="text-3xl font-black my-5">Products at a great price</h6>

            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4 '>

                {data && (
                    <>
                        {data.map((product, index) => (
                            <Link href={`/products/products?q1=${product.category}&q2=${encodeURIComponent(product?.name)}`}
                                className="flex flex-col items-left bg-white border-2 border-gray-200 rounded-lg shadow-lg"
                                key={index}>
                                


                                <section className='h-2/5 sm:h-3/5 m-1 relative'>

                                    {product.stock === 0 &&

                                        <div className='absolute flex w-20 rounded-lg p-1 items-center justify-center  bg-black text-white'>
                                            <span className='text-xs p-1 font-bold'>Sold out</span>
                                        </div>
                                    }

                                    {product.discount > 0 &&

                                        <div className='absolute flex w-12 rounded-lg p-1 items-center justify-center  bg-red-500 text-white'>
                                            <span className='text-xs p-1 font-bold'>{product.discount}%</span>
                                        </div>
                                    }

                                    <Image
                                        width={400}
                                        height={200}
                                        className='object-contain size-full p-1 '
                                        src={`/products/${product.category}/${product.id}/${product.photo[0]}`}
                                        alt={product.name}>

                                    </Image>

                                </section>

                                <section className="h-3/5 sm:h-2/5 flex flex-col justify-between text-left text-sm m-1">

                                    <Link
                                        href={`/products/products?q1=${product.category}&q2=${encodeURIComponent(product?.name)}`}
                                        className="mx-2 overflow-hidden text-wrap truncate font-bold tracking-tight">
                                        {product.name}
                                    </Link>

                                    <div className='inline-flex space-x-4 m-2'>

                                        {product.discountPrice > 0 ?
                                            <>
                                                <p className="text-slate-800 font-black">{product.discountPrice}$</p>
                                                <p className="text-slate-400 line-through ">{product.price}$</p>
                                            </>
                                            :
                                            <p className="text-slate-800 font-black">{product.price}$</p>
                                        }

                                    </div>

                                </section>
                            </Link>
                        ))}
                    </>
                )}

            </div>

        </section>

    )

}