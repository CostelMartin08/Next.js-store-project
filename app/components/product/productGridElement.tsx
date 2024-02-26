'use client'
import React from 'react';
import Image from 'next/image';
import { ProductT } from './product';
import { useRouter } from 'next/navigation';




const ElementGrid: React.FC<ProductT> = ({id, nameProduct, photoProduct, priceProduct, productDiscount, productStock }) => {

    const router = useRouter();


    const handleClick = () => {
        // Utilizăm template literals pentru a construi URL-ul cu parametrul 'item'
        router.push(`/products/item=${nameProduct}`);
        
    };

    return (


        <div className="font-md my-4">

            <div className="relative">
                <Image src={photoProduct} className="object-cover rounded" alt="sdf" width={500} height={300} />
                <span className="font-md discount absolute top-3 right-3">{productDiscount}%</span>
            </div>

            <button onClick={handleClick}>{nameProduct}</button>


            <div className="space-x-3">

                <span className="font-md clr-primary">{priceProduct}</span>
                <span className="font-md clr-gray line-through">{productDiscount}</span>

            </div>
        </div>


    )
}

export default ElementGrid;