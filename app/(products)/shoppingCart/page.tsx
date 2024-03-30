'use client'



import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cart from "../components/cart";
import Image from "next/image";
import "@/app/(products)/collections/[category]/products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons/faForward";
import { useCurrentUser } from "@/hooks/use-current-user";
import { orderProcessing } from "@/app/actions/shoppingCart";

import { FormData } from "@/app/types";
import { CartProduct } from "@/app/types";
const ShoppingCart = () => {

    const user = useCurrentUser();
    const router = useRouter();

    const [form, setForm] = useState<boolean>(false);

    const [error, setError] = useState<string>("");


    const [data, setData] = useState<CartProduct[]>([]);

    const [formData, setFormData] = useState<FormData>({
        contact: user?.email || undefined,
        country: undefined,
        name: user?.name || undefined,
        address: undefined,
        postalCode: undefined,
        city: undefined,
        state: undefined
    });


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cart: CartProduct[] = JSON.parse(sessionStorage.getItem('cart') || '[]');
            setData(cart);
        }
    }, []);


    const sendFormData = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        orderProcessing(formData, data)

            .then((res) => {
                if ('success' in res) {
                    sessionStorage.clear();
                    router.push('/shoppingCart/orderPlaced')
                } else {
                    setError(res.error);
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

    console.log(error)

    return (

        <section className="container h-dvh relative">

            {!form ?
                <div className="text-center">

                    <Cart data={data} setForm={setForm} setData={setData} />


                </div>
                : null}

            {form ?


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
                                    <option>Country</option>
                                    <option value="Romania">Romania</option>
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
                                    title='Enter only numbers'
                                    pattern="[0-9]*"
                                    placeholder="Postal code"
                                    value={formData.postalCode}
                                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                />

                                <input
                                    className="border rounded p-3 w-20 md:w-40"
                                    pattern="[A-Z][a-z]*"
                                    type="text"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />


                                <select

                                    className="border rounded p-3 w-20 md:w-40"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}>
                                    <option>State</option>
                                    <option value="Suceava">Suceava</option>
                                    <option value="Iasi">Iași</option>
                                    <option value="Bucuresti">Bucuresti</option>
                                </select>
                            </div>
                            {error && (
                                <div className="bg-red-500 text-white w-fit text-sm py-2 px-3 rounded-md mt-1">
                                    {error}
                                </div>
                            )}

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
                                            <Image
                                                width={400}
                                                height={400}
                                                className="w-8 sm:w-12"
                                                src={`/products/${element.category}/${element.id}/${element.photo[0]}`}
                                                alt={element.name}>
                                            </Image>
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

                : null}
        </section >

    );
}

export default ShoppingCart;