"use client"

import InputFile from "@/app/(products)/components/inputFile";
import { addProductsStock } from "@/app/types";
import localhostUrl from "@/nodeEnv";
import { faCircleCheck, faCircleExclamation, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";


export const AddProduct = () => {

    const [formData, setFormData] = useState<addProductsStock>({
        collection: '',
        files: [],
        productName: '',
        price: 0,
        stock: 0,
        description: '',
        discountPrice: 0,
    });

    const intialFormData = {
        collection: '',
        files: [],
        productName: '',
        price: 0,
        stock: 0,
        description: '',
        discountPrice: 0,
    }

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (event:

        ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>

    ) => {
        const { name, value, type } = event.target;

        if (type === 'file') {
            setFormData(prevState => ({
                ...prevState,
                [name]: Array.from((event.target as HTMLInputElement).files || [])
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {

            const formDataToSend = new FormData();

            formDataToSend.append('collection', formData.collection);
            formDataToSend.append('productName', String(formData.productName));
            formDataToSend.append('price', String(formData.price));
            formDataToSend.append('stock', String(formData.stock));
            formDataToSend.append('description', String(formData.description));
            formDataToSend.append('discountPrice', String(formData.discountPrice));

            formData.files.forEach((file) => {
                formDataToSend.append('file', file);
            });

            const res = await fetch(`${localhostUrl}/api/addProductStock`, {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await res.json();

            if (data?.error) {
                setSuccess('')
                setError(data.error);
            }
            else if (data?.success) {
                setFormData(intialFormData);
                setError('')
                setSuccess(data.success);
            }

        } catch (error) {
            console.log(error);
            setError('Error! Try again later!');
        }

    }

    return (

        <>
            {error && (
                <div className="text-left w-fit bg-red-500 text-white text-md m-2 p-2 rounded-md">
                    <FontAwesomeIcon className="me-3 text-lg" icon={faCircleExclamation} />
                    {error}
                </div>

            )}
            {success && (
                <div className="text-left w-fit bg-green-500 text-white text-md m-2 p-2 rounded-md">
                    <FontAwesomeIcon className="me-3 text-lg" icon={faCircleCheck} />
                    {success}
                </div>

            )}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-1">

                <form
                    onSubmit={handleSubmit}
                    className=" basis-4/4 sm:basis-3/4">

                    <div className="flex flex-col md:flex-row lg:gap-3">

                        <div className="basis-1/4 mx-auto">
                            <InputFile data={formData.files} setFunction={handleChange} />
                        </div>

                        <div className="basis-3/4 flex py-2 flex-col justify-between lg:ps-2">

                            <div className="contents text-left">
                                <label htmlFor="productName">Product Name:</label>
                                <input
                                    className="bg-transparent border border-black rounded p-3"
                                    name="productName"
                                    type="text"
                                    placeholder="Enter the product name"
                                    value={formData.productName}
                                    onChange={handleChange}


                                />
                            </div>
                            <div className="contents text-left">
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    className="bg-transparent border border-black rounded h-20 p-1"
                                    name="description"
                                    placeholder="Describe your product"
                                    value={formData.description}
                                    onChange={handleChange}

                                />
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col lg:flex-row mt-3 lg:ps-2 lg:gap-3">

                        <div className="flex gap-3 md:gap-6">

                            <div className="text-left basis-2/4">
                                <label htmlFor="collection">Collection:</label>
                                <select
                                    className="w-full bg-transparent border border-black rounded p-3"
                                    name="collection"
                                    value={formData.collection}
                                    onChange={handleChange}

                                >
                                    <option>Collection</option>
                                    <option value="laptops">Laptops</option>
                                    <option value="tablets">Tablets</option>
                                    <option value="smartphones">Smartphones</option>
                                    <option value="smartwatches">Smartwatches</option>

                                </select>
                            </div>

                            <div className="text-left  basis-2/4">
                                <label htmlFor="price">Price:</label>
                                <input
                                    className="w-full bg-transparent border border-black rounded p-3"
                                    name="price"
                                    type="number"
                                    pattern="^[1-9][0-9]*$"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={handleChange}

                                />
                            </div>

                        </div>

                        <div className="flex gap-3">

                            <div className="text-left  basis-2/4">
                                <label htmlFor="stock">Stock:</label>
                                <input
                                    className="w-full bg-transparent border border-black rounded p-3"
                                    name="stock"
                                    type="number"
                                    pattern="^[1-9][0-9]*$"
                                    placeholder="Stock"
                                    value={formData.stock}
                                    onChange={handleChange}

                                />
                            </div>

                            <div className="text-left  basis-2/4">
                                <label htmlFor="discountPrice">Discount price:</label>
                                <input
                                    className="w-full bg-transparent border border-black rounded p-3"
                                    name="discountPrice"
                                    type="number"
                                    pattern="^[1-9][0-9]*$"
                                    placeholder="Discount price"
                                    value={formData.discountPrice}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                    </div>

                    <div className="flex justify-end mt-8">

                        <button className="basis-2/4 sm:basis-1/4 text-white p-3 submit bg-emerald-950 font-black rounded" type="submit">Add Product</button>
                    </div>

                </form>

                <div className="lg:basis-1/4 p-2 md:h-[30rem] h-[25rem] mb-4">

                    <div className="p-3 text-slate-600 border bg-white flex justify-center flex-col h-full  rounded-md relative">


                        <p className="font-black text-2xl mb-10 z-10">Info Card</p>

                        <p
                            style={{ zIndex: '10' }}
                            className="p-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placera
                            t ipsum mauris, mattis vestibulum augue fringilla a.
                        </p>

                        <FontAwesomeIcon
                            className="text-slate-200/50 font-black text-[20rem] absolute"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                            icon={faQuestion} />

                    </div>

                </div>


            </div>

        </>
    )

}

export default AddProduct;