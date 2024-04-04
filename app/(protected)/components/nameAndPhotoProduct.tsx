"use client"

import Image from "next/image";

import { StatusProductProps } from "./statusProduct"
import { ChangeEvent, MouseEventHandler, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { modifyNameAndPhotos } from "@/app/actions/modifyProducts";


export const NameAndPhoto: React.FC<StatusProductProps> = ({ data }) => {

    const { product, index } = data;

    const [state, setState] = useState(false);
    const [nameProduct, setNameProduct] = useState('')



    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNameProduct(value);
    }

    const handleClick: MouseEventHandler<HTMLDivElement> = () => {
        const { name } = product;
        setState(true);
        setNameProduct(name);
    };


    const [dataToSend, setDataToSend] = useState<{ index: number; file: File | undefined; }[]>([]);

    const changeFile = (index: number, event: ChangeEvent<HTMLInputElement>) => {

        const selectedFile = event.target.files?.[0];
        console.log(selectedFile)
        const newData = { index: index, file: selectedFile };

        if (dataToSend.length < 5) {
            setDataToSend(prevData => [...prevData, newData]);
        } else {
            console.log('Nu se pot adăuga mai mult de 5 perechi de date.');
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const { id, category } = product;

        console.log(dataToSend)
        console.log(id)
        console.log(category)
        modifyNameAndPhotos(dataToSend, category, id)
            .then((data) => {
                if (data.success) {


                }


            })
            .catch((error) => {
                console.log(`Error fetching products ${error}`);
            });


    }

    return (
        <>
            <div
                onClick={handleClick}
                className="flex justify-left gap-3 items-center h-full hover:bg-slate-200 cursor-pointer">
                <span>{index}.</span>

                <Image
                    className="p-1 border-2 rounded"
                    src={`/products/${product.category}/${product.id}/${product.photo[0]}`}
                    alt={product.name}
                    height={40}
                    width={40}
                />

                <p className="text-left">{product.name}</p>

            </div>

            {state && (
                <div
                    style={{ bottom: '5px', left: '50%', top: '20%', transform: 'translateX(-50%)' }}
                    className="bg-gray-100 absolute w-full sm:w-3/4 h-3/4 border-2 rounded z-20"
                    key={index}
                >
                    <div className="flex justify-end">

                        <button
                            className="flex justify-center items-center size-8 p-4"
                            onClick={() => setState(false)}>

                            <FontAwesomeIcon
                                className="text-xl"
                                icon={faXmark}
                            />

                        </button>

                    </div>

                    <form onSubmit={onSubmit} className="p-10 flex flex-col gap-4">

                        <p className="text-xl  text-left">Product details</p>

                        <div className="flex flex-col items-start  gap-2">
                            <label htmlFor="nameProduct">Change product name:</label>
                            <input
                                name="nameProduct"
                                onChange={handleChange}
                                value={nameProduct}
                                type="text"
                                className="w-full border-2 p-3 rounded"
                            />
                        </div>

                        <div className="flex flex-col items-start gap-2">

                            <label className="">Change photos:</label>
                            <div className="flex gap-3">
                                {product.photo.map((photo, indexPhoto) => (
                                    <div className="relative" key={indexPhoto}>
                                        <input
                                            onChange={(event) => changeFile(indexPhoto, event)}
                                            style={{ bottom: '5px', left: '50%', top: '0%', transform: 'translateX(-50%)' }}
                                            className="cursor-pointer absolute size-full opacity-0"
                                            type="file"

                                        />
                                        <Image
                                            className="cursor-pointer"
                                            src={`/products/${product.category}/${product.id}/${photo}`}
                                            alt={product.name}
                                            width={90}
                                            height={90}
                                        />
                                    </div>
                                ))}
                            </div>



                        </div>



                        <button type="submit">Submit</button>




                    </form>
                </div>
            )}
        </>
    )
}


