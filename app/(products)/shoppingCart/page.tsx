'use client'


import { CartProduct } from "../products/[name]/page";
import { useEffect, useState } from "react";

import Cart from "../components/cart";

import "@/app/(products)/collections/[category]/products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons/faForward";
import { useCurrentUser } from "@/hooks/use-current-user";
import { identifyProductsCart } from "@/app/actions/shoppingCart";

export interface FormData {
    products?: CartProduct[];
    contact?: string;
    country?: string;
    name?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    state?: string;
}

const ShoppingCart = () => {

    const user = useCurrentUser();
    const [form, setForm] = useState<boolean>(false);


    const [data, setData] = useState<CartProduct[]>([]);

    const [formData, setFormData] = useState<FormData>({
        contact: user?.email || '',
        country: 'Romania',
        name: user?.name || '',
        address: '',
        postalCode: undefined,
        city: '',
        state: ''
    });


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
            setData(cart);
        }
    }, []);


    const sendFormData = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        identifyProductsCart(formData, data)
            .then((res) => {
                if ('success' in res) {
                    localStorage.clear();
                    //  console.log("Operațiunea a fost finalizată cu succes!");
                } else {
                    // console.log("Operațiunea nu a fost finalizată cu succes!");
                }
            })
            .catch((error) => {
                console.error("Eroare:", error);
            });
    }

    const calculateTotal = (): number => {
        let total = 0;

        for (let i = 0; i < data.length; i++) {
            total += data[i].price;
        }

        return total;
    };


    return (

        <section className="container mx-auto">

            {!form ?
                <>
                    <Cart data={data} setForm={setForm} setData={setData} />

        
                </>
                : null}

            {form ?

                <section className="container">

                    <div className="flex flex-col md:flex-row px-8 py-5">



                        <div className="basis-4/4 lg:basis-2/4">



                            <form
                                onSubmit={sendFormData}
                                className="flex flex-col md:w-max mx-auto space-y-6">


                                <p className="text-[20px] w-max">Complete your data</p>

                                <input
                                    className="border rounded p-3"
                                    type="email"
                                    placeholder="Contact email"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                />

                                <label className="border rounded p-3">
                                    <select
                                        className="w-full"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
                                        <option value="">Country</option>
                                        <option value="option1">Romania</option>

                                    </select>
                                </label>

                                <input
                                    className="border rounded p-3"
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />

                                <input
                                    className="border rounded p-3"
                                    type="text"
                                    placeholder="Adress"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                                <div className="flex flex-row justify-between md:space-x-5">

                                    <input
                                        className="border rounded p-3 w-20 md:w-40"
                                        type="text"
                                        placeholder="Postal code"
                                        value={formData.postalCode}
                                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                    />

                                    <input
                                        className="border rounded p-3 w-20 md:w-40"
                                        type="text"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />


                                    <select
                                        className="border rounded p-3 w-20 md:w-40"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}>
                                        <option value="">State</option>
                                        <option value="option1">Suceava</option>
                                        <option value="option2">Iași</option>
                                        <option value="option3">Bucuresti</option>
                                    </select>
                                </div>


                                <div className="text-right my-5">
                                    <button
                                        type='submit'
                                        className="w-full p-3 border rounded bg-indigo-800 text-white">Send the order
                                        <FontAwesomeIcon
                                            className="px-2"
                                            icon={faForward}
                                        />
                                    </button>
                                </div>

                            </form>

                        </div>

                        <div className="basis-4/4 lg:basis-1/3 ">

                            <div className="space-y-6 pt-8">


                                {
                                    data.map((element, index,) => (

                                        <div
                                            className="w-3/4 mx-auto  py-5 flex items-center justify-between"
                                            key={index}>

                                            <div className="flex items-center space-x-3">
                                                <img className="w-8 sm:w-12" src={element.photo} alt={element.name}></img>
                                                <h3 className="text-[13px] md:text-[15px] w-26 text-wrap ">{element.name}</h3>
                                            </div>
                                            <span className="text-[14px]">{element.price} $</span>

                                        </div>
                                    ))

                                }

                                <div className="w-3/4 mx-auto  flex flex-col justify-start space-y-3">
                                    <span>
                                        Transport: 10$
                                    </span>
                                    <h3 className="text-[25px]">
                                        Total: {calculateTotal()}$
                                    </h3>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
                : null}
        </section >

    );
}

export default ShoppingCart;