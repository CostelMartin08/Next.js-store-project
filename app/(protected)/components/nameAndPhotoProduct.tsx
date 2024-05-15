import React, { useState, ChangeEvent, MouseEventHandler, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import localhostUrl from "@/nodeEnv";

interface StatusProductProps {

    data: {
        reload: boolean;
        setReload: (reload: boolean) => void;
        product: {

            id: string;
            category: string;
            name: string;
            photo: string[];
        };
        index: number;
    };
}

interface FileObject {

    file: File | string;
}

const NameAndPhoto: React.FC<StatusProductProps> = ({ data }) => {

    const { product, index, setReload, reload } = data;

    const [state, setState] = useState(false);
    const [nameProduct, setNameProduct] = useState('');

    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');


    const [fileObjects, setFileObjects] = useState<FileObject[]>([
        { file: product.photo[0] },
        { file: product.photo[1] },
        { file: product.photo[2] },
        { file: product.photo[3] },
        { file: product.photo[4] },
    ]);

    useEffect(() => {
        setFileObjects(product.photo.map((photo: string) => ({ file: photo })));
    }, [product]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNameProduct(value);
    };

    const handleClick: MouseEventHandler<HTMLDivElement> = () => {
        const { name } = product;
        setState(true);
        setNameProduct(name);
    };

    const handleFileChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const newFileObjects = [...fileObjects];
            newFileObjects[index] = {
                file: event.target.files[0]
            };
            setFileObjects(newFileObjects);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData();

        fileObjects.forEach((fileObj, index) => {
            if (fileObj.file === undefined && "") {
                fileObj.file = `${index}`
            }
            formData.append(`file[${index}]`, fileObj.file);
        });

        formData.append('category', product.category);
        formData.append('id', product.id);
        formData.append('name', nameProduct);

        const res = await fetch(`${localhostUrl}/api/upload/uploadProductPhoto`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }

        const data = await res.json();
        if (data.success) {
            setReload(!reload);
            return setSuccess(data.success);
        }

        return setError(data.error);

    };

    return (
        <>
            <div onClick={handleClick} className="flex justify-left gap-3 items-center h-full hover:bg-slate-200 cursor-pointer">
                <span>{index}.</span>
                <img
                    className="md:p-1 border-2 rounded"
                    src={`https://gadgetgrid.ro/images/${product.category}/${product.id}/${product.photo[0]}`}
                    alt={product.name}
                    height={40}
                    width={40}
                />
                <p className="text-left truncate">{product.name}</p>
            </div>

            {state && (
                <div
                    style={{ bottom: '5px', left: '50%', top: '10%', transform: 'translateX(-50%)' }}
                    className="bg-gray-100 absolute w-full sm:w-3/4 lg:w-2/4 h-max border-2 rounded z-20"
                    key={index}>

                    <div className="flex justify-end">
                        <button className="flex justify-center items-center size-8 p-4" onClick={() => setState(false)}>
                            <FontAwesomeIcon className=" text-sm sm:text-xl" icon={faTimes} />
                        </button>

                    </div>

                    <form onSubmit={onSubmit} className="p-3 sm:p-6 flex flex-col gap-4">
                        <p className="text-xl text-left">Product details</p>
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
                            <div className="flex gap-3 w-full">
                                {fileObjects.map((fileObj, index) => (
                                    <div className="relative w-1/5 mx-auto" key={index}>
                                        <input
                                            onChange={(event) => handleFileChange(index, event)}
                                            style={{ bottom: '5px', left: '50%', top: '0%', transform: 'translateX(-50%)' }}
                                            className="cursor-pointer absolute size-full opacity-0"
                                            type="file"
                                        />

                                        {fileObj.file ?

                                            (typeof fileObj.file === 'string' ? (
                                                <Image
                                                    className="cursor-pointer w-full"
                                                    src={`/products/${product.category}/${product.id}/${fileObj.file}`}
                                                    alt={product.photo[index]}
                                                    width={80}
                                                    height={80}
                                                />) : (
                                                <div className="border-2 h-full flex flex-col gap-2 justify-center items-center">

                                                    <FontAwesomeIcon icon={faFileImage} />
                                                    <span>{fileObj.file.name}</span>

                                                </div>
                                            ))
                                            : <div className="border-2 h-full flex justify-center items-center"><FontAwesomeIcon icon={faPlus} /></div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                        {error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-2 px-3 rounded-md mt-1">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500 text-white w-fit text-sm py-2 px-3 rounded-md mt-1">
                                {success}
                            </div>
                        )}

                        <div className="text-right text-xs sm:text-base">
                            <button className="w-1/4 text-white p-2 sm:p-3 bg-emerald-950 font-black rounded" type="submit">Change</button>
                        </div>

                    </form>
                </div>
            )}
        </>
    );
};

export default NameAndPhoto;
