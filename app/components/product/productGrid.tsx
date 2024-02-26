'use client'
import React, { useEffect, useState } from "react";
import ElementGrid from "./productGridElement";
import { ProductT } from "./product";


const ProductGrid = () => {

    const [data, setData] = useState<ProductT[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/products', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Eroare la interogare');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);



    return (

        <section className="container mx-auto mt-5 p-5">

            <h3 className="font-lg py-8">Recomandările Lunii:</h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">


                {data.map(element => (
                    <ElementGrid
                        id={element.id}
                        nameProduct={element.nameProduct}
                        photoProduct={element.photoProduct}
                        priceProduct={element.priceProduct}
                        productDiscount={element.productDiscount}
                        discountPrice = {element.discountPrice}
                        productStock={element.productStock}
                    />))}

            </div>

        </section>
    )
}

export default ProductGrid;