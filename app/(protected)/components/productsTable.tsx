"use client"

import Image from "next/image";

import { getAllProductsInAllCategories } from "@/app/actions/products";
import { ProductsStock, allValues } from "@/app/types";
import { useEffect, useState } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatusProduct } from "./statusProduct";

export const ProductsTable = () => {

    const [allProducts, setAllProducts] = useState<ProductsStock[]>([]);
    const [error, setError] = useState<string | unknown>(null);

    useEffect(() => {

        getAllProductsInAllCategories()
            .then((data) => {
                if (data.success) {
                    setAllProducts(data.success)
                }
                setError(data.error);
            })
            .catch((error) => {
                setError(`Error fetching products ${error}`);

            });

    }, []);

    const productContent = allProducts?.map((product, index) => (
        <ProductData key={index} product={product} index={index} />
    ));

    return (
        <table style={{ tableLayout: 'fixed', width: '100%' }} className="table-auto mx-auto text-sm mb-20">

            <caption className="text-3xl text-center font-black pb-20">
                Product List
            </caption>

            <thead className="border-b-2">



                <tr className='flex'>

                    <th className="w-4/12" scope="col">Product</th>
                    <th className="w-2/12" scope="col">Status</th>
                    <th className="w-2/12" scope="col">Inventory</th>
                    <th className="w-1/12 " scope="col">Units Sold</th>
                    <th className="w-1/12 " scope="col">Stock</th>
                    <th className="w-1/12 " scope="col">Price</th>
                    <th className="w-1/12 " scope="col">Discount Price</th>
                </tr>

            </thead>

            <tbody className="flex flex-wrap">

                {productContent}


            </tbody>

        </table>
    );
}


interface ProductRowProps {
    product: ProductsStock;
    index: number;
}

const ProductData: React.FC<ProductRowProps> = ({ product, index }) => (

    <tr className="flex border-b-2 w-full">

        <th className="w-4/12">
            <div className="flex justify-left gap-3 items-center h-full">

                <span>{index}.</span>

                <Image
                    className="p-1 border-2 rounded"
                    src={`/products/${product.category}/${product.id}/${product.photo[0]}`}
                    alt={product.name}
                    height={40}
                    width={40}>

                </Image>

                <p className="text-left">{product.name}</p>

            </div>
        </th>

        <th className="w-2/12">

            <StatusProduct data={{ product, index }} />

        </th>
        <th className="w-2/12">

            <div className="h-24 w-full  flex items-center justify-center" key={index}>
                <span>{product.category}</span>
            </div>

        </th>
        <th className="w-1/12">
            <div className="flex h-24 items-center justify-center">
                <p className="">{product.unitsSold}</p>
            </div>
        </th>
        <th className="w-1/12">
            <div className="flex h-24 items-center gap-1 justify-center">
                <p className="">{product.stock}</p>
                <FontAwesomeIcon className="text-xs p-1" icon={faPenToSquare} />
            </div>
        </th>
        <th className="w-1/12">
            <div className="flex h-24 items-center justify-center">
                <p className="">{product.price}$</p>
            </div>
        </th>
        <th className="w-1/12">
            <div className="flex h-24 items-center justify-center">
                <p className="">{product.discountPrice}</p>
            </div>
        </th>
    </tr>

);





