'use client'

import { useSearchParams } from "next/navigation";
import { Key, SetStateAction, useCallback, useState } from "react";

import ImageViewer from 'react-simple-image-viewer';

import './components.css';

const PhotoProduct: React.FC<any> = (props) => {


    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

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

    const baseURL = `https://gadgetgrid.ro/images/${param}/${props.data.id}/`;

    const imageUrls = props.data.photo.map((fragment: string) => baseURL + fragment);

    return (

        <section className="flex flex-col justify-center items-center gap-8">


            <div className="grid-container">

                {imageUrls.map((src: string | undefined, index: Key | null | undefined) => (

                    <div className={index === 0 ? `first-item` : ''} key={index}>
                        <img
                        className="mx-auto"
                            src={src}
                            onClick={() => openImageViewer(index as any)}
                            width={index === 0 ? 400 : 80}
                            alt={`${index}`}
                        />

                    </div>

                ))}


            </div>
            {isViewerOpen && (
                <ImageViewer
                    src={imageUrls}
                    currentIndex={currentImage}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                    backgroundStyle={{
                        backgroundColor: "#31363F",
                    
                      }}
                />
            )}

        </section>

    )

}

export default PhotoProduct;