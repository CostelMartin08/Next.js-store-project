'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


type ProductProps = {
    key: string;
    name: string;
    photo: string;
    price: number;
    discount: boolean;
    stock: number;
};


const ElementGrid: React.FC<ProductProps> = ({key, name, photo, price, discount, stock }) => {

    const router = useRouter();


    const handleClick = () => {
        // Utilizăm template literals pentru a construi URL-ul cu parametrul 'item'
        router.push(`/products/item=${name}`);
        
    };

    return (


        <div className="font-md my-4">

            <div className="relative">
                <Image src={photo} className="object-cover rounded" alt="sdf" width={500} height={300} />
                <span className="font-md discount absolute top-3 right-3">{discount}%</span>
            </div>

            <button onClick={handleClick}>{name}</button>


            <div className="space-x-3">

                <span className="font-md clr-primary">{price}</span>
                <span className="font-md clr-gray line-through">{discount}</span>

            </div>
        </div>


    )
}

export default ElementGrid;