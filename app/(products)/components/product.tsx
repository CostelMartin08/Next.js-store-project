'use client'

import Link from 'next/link';
import React from 'react';

interface ProductData {
    name: string;
    price: number;
    photo: string;
    discount: boolean;
    discountPrice: number;
    stock: number;

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
                            className="flex flex-col h-72 md:h-96 w-full mx-auto items-left bg-white border-2 border-gray-200 rounded-lg">

                            <section className='h-3/5 py-3 w-full mx-auto relative'>
                                {product.stock === 0 &&
                                    <div className='span bg-black position'>
                                        <span className='text-[11px] md:text-[13px] font-bold'>Sold out</span>
                                    </div>}
                                {product.discount &&
                                    <div className='discount-price position bg-red-500 text-white'>
                                        <span className='text-[11px] md:text-[13px] font-bold'>26%</span>
                                    </div>}
                                <img className='img size-full mx-auto' src={product.photo} alt={product.name}></img>
                            </section>

                            <section className="h-2/5 flex flex-col justify-between text-left p-2">

                                <Link
                                    href={`/products/products?q1=${props.category}&q2=${encodeURIComponent(product?.name)}`}
                                    className="text-[18px] text-wrap h-12 truncate font-bold tracking-tight text-gray-900">
                                    {product.name}
                                </Link>
                                <div className='inline-flex space-x-4'>
                                    <p className="text-slate-800 font-bold  text-[15px]">{product.discountPrice}$</p>
                                    {product.discount &&
                                        <p className="text-slate-400 line-through text-[15px]">3.000$</p>}

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
