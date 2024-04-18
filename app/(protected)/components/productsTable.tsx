"use client"

import Image from "next/image";

import { getAllProductsInAllCategories } from "@/app/actions/products";
import { ProductsStock } from "@/app/types";
import { useEffect, useState } from "react";
import { StatusProduct } from "./statusProduct";
import { StockProduct } from "./stockProduct";
import { PriceAndDiscount } from "./priceAndDiscountProduct";
import NameAndPhoto from "./nameAndPhotoProduct";

export const ProductsTable = () => {

    const [allProducts, setAllProducts] = useState<ProductsStock[]>([]);
    const [error, setError] = useState<string | unknown>(null);

    const [reload, setReload] = useState<boolean>(false);

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

    }, [reload]);

    const productContent = allProducts?.map((product, index) => (
        <ProductData key={index} reload={reload} setReload={setReload} product={product} index={index} />
    ));

    return (
        <table style={{ tableLayout: 'fixed', width: '100%' }} className="table-auto mt-8 mx-auto relative  text-sm mb-20">

      

            <thead className="border-b-2">



                <tr className='flex text-[10px] md:text-base'>

                    <th className="w-4/12" scope="col">Product</th>
                    <th className="w-2/12" scope="col">Status</th>
                    <th className="w-1/12 md:w-2/12 truncate" scope="col">Inventory</th>
                    <th className="w-1/12 truncate" scope="col">Units Sold</th>
                    <th className="w-1/12 " scope="col">Stock</th>
                    <th className="w-1/12 " scope="col">Price</th>
                    <th className="w-2/12 md:w-1/12 " scope="col">Discount Price</th>
                </tr>

            </thead>

            <tbody className="flex flex-wrap">

                {productContent}


            </tbody>

        </table>
    );
}


interface ProductRowProps {
    reload: boolean;
    setReload: (reload: boolean) => void;
    product: ProductsStock;
    index: number;
}

const ProductData: React.FC<ProductRowProps> = ({reload, setReload, product, index }) => (

    <tr className="flex border-b-2 w-full">

        <th className="w-4/12">


            <NameAndPhoto data={{reload, setReload, product, index }} />


        </th>

        <th className="w-2/12">

            <StatusProduct data={{ product, index }} />

        </th>
        <th className="w-1/12 md:w-2/12">

            <div className="h-24 w-full text-[10px]  md:text-base  flex items-center justify-center" key={index}>
                <span className="hidden md:block">{product.category}</span>
                <span className="md:hidden">{product.category.charAt(0)}</span>
            </div>

        </th>
        <th className="w-1/12">
            <div className="flex h-24 items-center justify-center">
                <p className="text-[10px] md:text-base">{product.unitsSold}</p>
            </div>
        </th>
        <th className="w-1/12 relative">

            <StockProduct data={{ product, index }} />

        </th>

        <PriceAndDiscount data={{ product, index }} />
    </tr>

);





