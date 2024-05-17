"use client"

import Slider from "react-slick";
import './react-slick.css';
import './react-slick.theme.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Data } from "./photoProduct";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import { faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function NextArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "transparent" }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div

            className={className}
            style={{ ...style, display: "block", backgroundColor: "transparent" }}
            onClick={onClick}>

        </div>
    );
}

const ReactSlick: React.FC<Data> = (props) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const searchParams = useSearchParams();
    const param = searchParams.get('q1')

    let settings = {
        customPaging: function (i: number) {

            const index = i - 1;

            return (

                <a>
                    <Image alt='photo' height={80} width={80} src={`products/${param}/${props.data.id}/${props.data.photo[index + 1]}`} />
                </a>
            );
        },
        arrows: false,
        nextArrow: <NextArrow className={undefined} style={undefined} onClick={undefined} />,
        prevArrow: <PrevArrow className={undefined} style={undefined} onClick={undefined} />,
        dotsClass: "slick-dots slick-thumb",
        initialSlide: props.image,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,


    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (

        <Slider {...settings}>

            {props.data.photo.map((element, index) => {
                return (
                    <div key={index} className="flex justify-center items-center">
                        <TransformWrapper
                            disabled={windowWidth < 600 ? true : false}
                            initialScale={1}
                            limitToBounds={true}
                            centerOnInit={true}
                            maxScale={4}
                        >
                            {({ zoomIn, resetTransform }) => (
                                <React.Fragment>
                                    <div className="flex justify-end gap-2 md:gap-5 text-lg overflow-visible">
                                        <button className="size-8" onClick={() => zoomIn()}>
                                            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                                        </button>
                                        <button className="size-8" onClick={() => resetTransform()}>
                                            <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
                                        </button>
                                    </div>
                                    <TransformComponent>
                                        <Image width={900} height={900} alt={`${props.data.name}`} src={`/products/${param}/${props.data.id}/${element}`} />
                                    </TransformComponent>
                                </React.Fragment>
                            )}
                        </TransformWrapper>
                    </div>
                );
            })}

        </Slider>

    )


}

export default ReactSlick;