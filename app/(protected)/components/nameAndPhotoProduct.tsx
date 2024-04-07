import React, { useState, ChangeEvent, MouseEventHandler } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { fork } from "child_process";

interface StatusProductProps {
    data: {
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
    const { product, index } = data;

    const [state, setState] = useState(false);
    const [nameProduct, setNameProduct] = useState('');
    const [fileObjects, setFileObjects] = useState<FileObject[]>([
        { file: product.photo[0] },
        { file: product.photo[1] },
        { file: product.photo[2] },
        { file: product.photo[3] },
        { file: product.photo[4] },
    ]);

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

        const res = await fetch('http://localhost:3000/api/upload/uploadProductPhoto', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }

        const value = await res.json();
        console.log(value);
    };

    return (
        <>
            <div onClick={handleClick} className="flex justify-left gap-3 items-center h-full hover:bg-slate-200 cursor-pointer">
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
                <div style={{ bottom: '5px', left: '50%', top: '20%', transform: 'translateX(-50%)' }} className="bg-gray-100 absolute w-full sm:w-3/4 h-3/4 border-2 rounded z-20" key={index}>
                    <div className="flex justify-end">
                        <button className="flex justify-center items-center size-8 p-4" onClick={() => setState(false)}>
                            <FontAwesomeIcon className="text-xl" icon={faTimes} />
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
                                {fileObjects.map((fileObj, index) => (
                                    <div className="relative" key={index}>
                                        <input
                                            onChange={(event) => handleFileChange(index, event)}
                                            style={{ bottom: '5px', left: '50%', top: '0%', transform: 'translateX(-50%)' }}
                                            className="cursor-pointer absolute size-full opacity-0"
                                            type="file"
                                        />
                                        {fileObj.file ?
                                            <Image
                                                className="cursor-pointer"
                                                src={`/products/${product.category}/${product.id}/${fileObj.file}`}
                                                alt={product.name}
                                                width={90}
                                                height={90}
                                            />
                                            : <div>+</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default NameAndPhoto;
