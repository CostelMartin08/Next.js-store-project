'use client'

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface ProductData {
    id:string;
    name: string;
    price: number;
    photo: string[];
    description: string | null;
    discountPrice: number;
    stock: number;
}

interface ProductProps {
    data: ProductData[];
    category: string;
}

const OneProduct: React.FC<ProductProps> = (props) => {

    console.log()

    return (
        <>
            {props.data && (
                <>
                    {props.data.map((product, index) => (
                        <div
                            key={index}
                            style={{ height: '25rem' }}
                            className="flex flex-col items-left bg-white border-2 border-gray-200 rounded-lg">

                            <section className='h-2/4 sm:h-3/5 m-1 relative'>
                                {product.stock === 0 &&
                                    <div className='span bg-black'>
                                        <span className='text-xs p-1 font-bold'>Sold out</span>
                                    </div>}
                                {product.discountPrice > 0 &&
                                    <div className='discount-price position flex  bg-red-500 text-white'>
                                        <span className='text-xs p-1 font-bold'>26%</span>
                                    </div>}
                                <Image
                                    width={400}
                                    height={400}
                                    className='object-contain size-full p-1'
                                    src={`/products/${props.category}/${product.id}/${product.photo[0]}`}
                                    alt={product.name}>

                                </Image>

                            </section>

                            <section className="h-2/4 sm:h-2/5 flex flex-col justify-between text-left text-[0.9rem] m-1">

                                <Link
                                    href={`/products/products?q1=${props.category}&q2=${encodeURIComponent(product?.name)}`}
                                    className="mx-2 overflow-hidden text-wrap truncate font-bold tracking-tight">
                                    {product.name}
                                </Link>
                                <div className='inline-flex space-x-4 m-2'>
                                    <p className="text-slate-800 font-black">{product.price}$</p>
                                    {product.discountPrice > 0 &&
                                        <p className="text-slate-400 line-through ">{product.discountPrice}</p>}

                                </div>

                            </section>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default OneProduct;
