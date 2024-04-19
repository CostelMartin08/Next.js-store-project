'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

export interface ProductData {
    id: string;
    name: string;
    price: number;
    photo: string[];
    description: string | null;
    discount: number;
    discountPrice: number;
    stock: number;
    category?: string;
}

interface ProductProps {
    data: ProductData[];
    category: string;
}

const OneProduct: React.FC<ProductProps> = (props) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
      setImageLoaded(true);
    };
  

    return (
        <>
            {props.data && (
                <>
                    {props.data.map((product, index) => (
                        <div
                            key={index}
                            style={{ height: '25rem' }}
                            className="flex flex-col items-left bg-white border-2 border-gray-200 rounded-lg">

                            <section className='h-2/5 sm:h-3/5 m-1 relative'>

                                {product.stock === 0 &&

                                    <div className='absolute flex w-20 rounded-lg p-1 items-center justify-center  bg-black text-white'>
                                        <span className='text-xs p-1 font-bold'>Sold out</span>
                                    </div>
                                }

                                {product.discount > 0 && product.stock > 0 &&

                                    <div className='absolute flex w-12 rounded-lg p-1 items-center justify-center  bg-red-500 text-white'>
                                        <span className='text-xs p-1 font-bold'>{product.discount}%</span>
                                    </div>
                                }

                                <img
                                    width={400}
                                    height={200}
                                    className='object-contain size-full p-1 '
                                    src={imageLoaded ? `/images/${props.category}/${product.id}/${product.photo[0]}` : '/appPhoto/loading.png'}
                                    alt={product.name}
                                    onLoad={handleImageLoad}>
                                </img>

                            </section>

                            <section className="h-3/5 sm:h-2/5 flex flex-col justify-between text-left text-sm m-1">

                                <Link
                                    href={`/products/products?q1=${props.category}&q2=${encodeURIComponent(product?.name)}`}
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
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default OneProduct;
