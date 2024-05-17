'use client'

import { useSearchParams } from "next/navigation";
import { SetStateAction, useCallback, useState } from "react";

import './components.css';

import { ProductData } from "./product";
import ReactSlick from "./react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export interface Data {
    data: ProductData;
    image?: number;
}

const PhotoProduct: React.FC<Data> = (props) => {


    const [currentImage, setCurrentImage] = useState<number>(0);
    const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

    const searchParams = useSearchParams();

    const param = searchParams.get('q1')


    const openImageViewer = useCallback((index: SetStateAction<number>) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);


    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const baseURL = `/products/${param}/${props.data.id}/`;

    const imageUrls = props?.data.photo.filter((fragmnet: string) => fragmnet.length >= 3)
        .map((fragment: string) => baseURL + fragment)


    return (

        <section className="w-full">

            {!isViewerOpen &&
                <section className='grid grid-cols-1  gap-2 sm:gap-4'>

                    <div className="flex flex-col justify-center items-center">

                        <div className="grid-container">

                            {imageUrls
                                .map((src: string, index: number) => {
                                    return (
                                        <div className={index === 0 ? `first-item` : 'grid-item'} key={index}>
                                            <Image
                                                className="mx-auto"
                                                src={src}
                                                onClick={() => openImageViewer(index)}
                                                width={index === 0 ? 400 : 80}
                                                height={index === 0 ? 300 : 60} 
                                                alt={`${index}`}
                                                style={{ cursor: 'pointer' }} 
                                                loading="lazy">
                                            </Image> 
                                        </div>
                                    );
                                })}


                        </div>

                    </div>
                </section>
            }

            {isViewerOpen && (
                <section
                    className="absolute size-full md:size-11/12 md:rounded-lg
                    bg-gray-500 flex flex-col  md:justify-start items-center
                    z-30"
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>

                    <div
                        onClick={() => closeImageViewer()}
                        className="w-full text-right">
                        <button className="text-xl font-black size-9">
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </div>

                    <section
                        className=" w-full my-auto md:my-1 sm:w-[530px]  md:w-[580px]">

                        <ReactSlick data={props.data} image={currentImage} />

                    </section>

                </section>
            )}

        </section>

    )

}

export default PhotoProduct;