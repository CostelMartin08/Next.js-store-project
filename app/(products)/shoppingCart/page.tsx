'use client'

import { CartProduct } from "../products/[name]/page";
import { useEffect, useState } from "react";



const ShoppingCart = () => {

    const [data, setData] = useState<CartProduct[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
            setData(cart);
        }
    }, []);



    return (
        <>
            <h3>Hello</h3>
            {data.map((element, index) => (
                <div key={index}>
                    <h2>{element.name}</h2>
                    <h6>{element.count}</h6>
                    <h6>{element.category}</h6>
                </div>
            ))}
        </>
    );
}

export default ShoppingCart;