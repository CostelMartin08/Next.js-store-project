import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import Image from 'next/image';
import img from '../../public/LateToWork.jpg';
import '../components/components.css';
import { useParams } from 'next/navigation'


export type ProductT = {
    id: string;
    nameProduct: string;
    photoProduct: string;
    productStock: number;
    priceProduct: number;
    productDiscount: boolean;
    discountPrice: number;
};


export default function Product() {

    const params = useParams()

    const item = params.item as string;
    const decodedItem = decodeURIComponent(item);
    const afterEqualSign = decodedItem.split('=')[1];

    const [data, setData] = useState<ProductT | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/products/${afterEqualSign}`, {
                    method: 'POST',

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

        <section className="container mx-auto">

            {data && (

                <div className="grid grid-cols-1 lg:grid-cols-2  p-5 md:mt-20">

                    <div className="flex flex-col gap-8">

                        <div className="w-full lg:w-5/6 mx-auto my-auto">

                            <Image className="w-full rounded-md " src={data.photoProduct} width={500} height={300} alt="work" />

                        </div>

                        <div className="w-5/6 flex gap-5 justify-center mx-auto">

                            <div className="w-1/4 "><Image className="rounded" src={img} alt="work" /></div>
                            <div className="w-1/4 "><Image className="rounded" src={img} alt="work" /></div>
                            <div className="w-1/4 "><Image className="rounded" src={img} alt="work" /></div>
                            <div className="w-1/4 "><Image className="rounded" src={img} alt="work" /></div>

                        </div>

                    </div>

                    <div className="grid grid-row-5 gap-3 mt-10 lg:mt-0  content-between xl:content-evenly">

                        <div className="space-y-3 lg:w-3/4">

                            <span className="font-sm clr-primary">SNEAKER COMPANY</span>

                            <h2 className="font-lg ">{data.nameProduct}</h2>

                            <p className="font-md pt-5 md:w-3/4 text-left clr-gray">
                                These low-profile sneakers are you perfect casual wear companion.
                                Featuring a durable rubber sole, they`ll withstand everything the
                                weather can offer.
                            </p>

                        </div>

                        <div className="space-y-5">

                            <div className="flex space-x-5 items-center">
                                <span className="font-lg">${data.priceProduct}</span>
                                <span className="font-md discount">50%</span>
                            </div>

                            <div>
                                <span className="font-md clr-gray line-through">$250.00</span>
                            </div>

                        </div>

                        <div className="flex space-x-5">

                            <div className="increment bg-slate-100 w-1/4">
                                <FontAwesomeIcon className="w-1/3 my-auto clr-primary text-center" icon={faMinus} />
                                <button className="w-1/3">0</button>
                                <FontAwesomeIcon className="w-1/3 my-auto clr-primary text-center" icon={faPlus} />
                            </div>

                            <div className=" order">
                                <FontAwesomeIcon icon={faCartShopping} />
                                <button>Add to cart</button>
                            </div>

                        </div>

                    </div>

                </div>

            )}

        </section>
    )

}