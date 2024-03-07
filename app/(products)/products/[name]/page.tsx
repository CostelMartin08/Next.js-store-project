'use client'
import { getProductsByName } from '@/app/actions/products';
import { Product } from '@/app/data/products';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';



const ProductPage = () => {


    const param = useSearchParams();
    const name = param.get('q2');
    const category = param.get('q1');
    const decodedName = decodeURIComponent(name as string);



    const [data, setData] = useState<Product | null>(null);


    useEffect(() => {

        if (category as string) {

            getProductsByName(category as string, decodedName as string)
                .then((data) => {
                    setData(data as Product)
                })
                .catch((error) => {
                    console.log(error)
                });

        }
    }, []);



    return (
        <section className="container mx-auto">

            {data && (

                <div className="grid grid-cols-1 lg:grid-cols-2  p-5 md:mt-20">

                    <div className="flex flex-col gap-8">

                        <div className="w-full lg:w-5/6 mx-auto my-auto">

                            <img className="w-full rounded-md " src={data.photo} width={500} height={300} alt="work" />

                        </div>

                        <div className="w-5/6 flex gap-5 justify-center mx-auto">

                            <div className="w-1/4 "><img className="rounded" src={data.photo} alt="work" /></div>
                            <div className="w-1/4 "><img className="rounded" src={data.photo} alt="work" /></div>
                            <div className="w-1/4 "><img className="rounded" src={data.photo} alt="work" /></div>
                            <div className="w-1/4 "><img className="rounded" src={data.photo} alt="work" /></div>

                        </div>

                    </div>

                    <div className="grid grid-row-5 gap-3 mt-10 lg:mt-0  content-between xl:content-evenly">

                        <div className="space-y-3 lg:w-3/4">

                            <span className="font-sm clr-primary">SNEAKER COMPANY</span>

                            <h2 className="font-lg ">{data.name}</h2>

                            <p className="font-md pt-5 md:w-3/4 text-left clr-gray">
                                These low-profile sneakers are you perfect casual wear companion.
                                Featuring a durable rubber sole, they`ll withstand everything the
                                weather can offer.
                            </p>

                        </div>

                        <div className="space-y-5">

                            <div className="flex space-x-5 items-center">
                                <span className="font-lg">${data.price}</span>
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


export default ProductPage;