'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartProduct } from "../products/[name]/page";
import { useEffect, useState } from "react";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons/faBoxOpen";


import "@/app/(products)/collections/[category]/products.css";


const ShoppingCart = () => {

    const [data, setData] = useState<CartProduct[]>([]);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
            setData(cart);
        }
    }, []);


    const increment = (stock: number, id: string): void => {
        setData(prevData => {
            const updatedData = prevData.map(item => {
                if (item.id === id) {
                    if (item.count < stock) {
                        return { ...item, count: item.count + 1, price: item.countPrice + item.price };
                    } else {
                        return item;
                    }
                }
                return item;
            });

            localStorage.setItem('cart', JSON.stringify(updatedData));

            return updatedData;
        });
    };

    const decrement = (id: string): void => {
        setData(prevData => {
            const updatedData = prevData.map(item => {
                if (item.id === id) {
                    if (item.count > 1) {
                        return { ...item, count: item.count - 1, price: item.price - item.countPrice };
                    } else {
                        return item;
                    }
                }
                return item;
            });

            localStorage.setItem('cart', JSON.stringify(updatedData));

            return updatedData;
        });
    };

    const calculateTotal = (): number => {
        let total = 0;

        for (let i = 0; i < data.length; i++) {
            total += data[i].price;
        }

        return total;
    };


    return (

        <section className="container mx-auto">

            {data.length > 0 ?

                <>
                    {data.map((element, index) => (

                        <div
                            className="border flex flex-row px-10 py-3 my-4"
                            key={index}
                        >

                            <div className="basis-1/4">
                                <img className="img w-40 h-40" src={element.photo} alt={element.name}></img>
                            </div>

                            <div className="basis-2/4">
                                <h3 className="">{element.name}</h3>
                            </div>

                            <div className="basis-1/4 flex flex-col justify-center items-end px-3">

                                <p>{element.price}$</p>

                                <div className="bg-slate-100 w-1/4 py-2 rounded text-center flex items-center">

                                    <button
                                        className="w-1/3"
                                        onClick={() => { decrement(element.id) }}
                                    >
                                        <FontAwesomeIcon
                                            className="clr-primary"
                                            icon={faMinus} />
                                    </button>

                                    <div
                                        className='w-1/3 select-none'>
                                        <p>{element.count}</p>
                                    </div>

                                    <button
                                        className="w-1/3"
                                        onClick={() => { increment(element.stock, element.id) }}
                                    >
                                        <FontAwesomeIcon
                                            className="clr-primary"
                                            icon={faPlus} />
                                    </button>

                                </div>


                            </div>

                        </div>

                    ))}

                    <div className="border flex justify-end px-5 py-3">

                        <p className="text-[20px]">Total price: {calculateTotal()} $</p>

                    </div>
                </> : <h2 className="mx-auto  w-max text-[25px] mt-20">Your cart is empty <FontAwesomeIcon icon={faBoxOpen} /></h2>}
        </section >

    );
}

export default ShoppingCart;