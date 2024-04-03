"use client"

import { ChangeEvent, useState } from "react";
import { StatusProductProps } from "./statusProduct"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";


import './components.css';
import { createDiscount } from "@/app/actions/modifyProducts";

export const PriceAndDiscount: React.FC<StatusProductProps> = ({ data }) => {


    const { product, index } = data;

    const [state, setState] = useState<number | undefined>(product.discountPrice);
    const [visible, setVisible] = useState(false);
    const [feedback, setFeedback] = useState(false);


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVisible(true);

        let value = event.target.value;

        if (value === '') {

            setState(undefined)
        } else {

            setState(Number(value));
        }
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();


        createDiscount(product, product.price, state as number)
            .then((data) => {
                if (data.success) {
                    setFeedback(data.success);
                    feedbackExpires();
                }

                setVisible(false);
            })
            .catch((error) => {
                console.log(`Error fetching products ${error}`);
            });
    };

    function feedbackExpires() {

        setTimeout(() => {
            setFeedback(false);
        }, 3000);

    }




    return (

        <>
            <th className="w-1/12">
                <div className="flex h-24 items-center justify-center">
                    <p className="">{product.price}$</p>
                </div>
            </th>
            <th className="w-1/12 relative p-1" >
                <form
                    onSubmit={handleSubmit}
                    className={`${!visible ? 'gap-1' : 'gap-3'} flex h-24 items-center justify-center`}>

                    <input
                        id='input-dicount'
                        max={product.price - 1}
                        name="state"
                        value={state}
                        onChange={handleChange}
                        type="number"
                        className="w-[2.3rem] text-center bg-transparent" />
                    {!visible && <span>$</span>}
                    {
                        visible &&
                        <button className=" text-sm bg-green-100 rounded-lg" type="submit">
                            <FontAwesomeIcon
                                className="text-xs p-1 pb-0 cursor-pointer"
                                icon={faArrowRightLong}
                            />
                        </button>
                    }

                </form>

                {
                    feedback &&
                    <p
                        style={{ bottom: '8px', left: '50%', transform: 'translateX(-50%)' }}
                        className="w-max absolute p-1 rounded  bg-green-100 text-[10px]"
                    >Discount created!
                    </p>
                }


            </th>

        </>
    )
}