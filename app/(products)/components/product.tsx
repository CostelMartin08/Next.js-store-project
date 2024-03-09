'use client'

import Link from 'next/link';
import React from 'react';

interface ProductData {
    name: string;
    price: number;
    photo: string;
}

interface ProductProps {
    data: ProductData[];
    category: string;
}

const OneProduct: React.FC<ProductProps> = (props) => {

    return (
        <>
            {props.data && (
                <>
                    {props.data.map((product, index) => (
                        <div
                            key={index}
                            className="card-height flex flex-col items-left bg-white border border-gray-200 rounded-lg space-y-4"
                        >
                            <section className='h-3/5 lg:h-3/4 py-3 relative'>
                                <div className='span position'>
                                    <span className='text-[11px] md:text-[13px] font-bold'>Sold out</span>
                                </div>
                                <div className='discount-price position bg-red-500 text-white'>
                                    <span className='text-[11px] md:text-[13px] font-bold'>-26%</span>
                                </div>
                                <img className='img rounded-t-lg size-full' src={product.photo} alt={product.name}></img>
                            </section>

                            <section className="h-1/4 flex flex-col text-left space-y-3 px-3 m-0">
                                <Link href={`/products/products?q1=${props.category}&q2=${encodeURIComponent(product?.name)}`} className="text-[18px]  font-bold tracking-tight text-gray-900">
                                    {product.name}
                                </Link>
                                <div className='inline-flex space-x-4'>
                                    <p className="text-slate-400  text-[15px]">{product.price}$</p>
                                    <p className="text-slate-400 line-through text-[15px]">3.000$</p>
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
