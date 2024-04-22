"use client"

import Slider from "react-slick";
import './react-slick.css';
import './react-slick.theme.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Data } from "./photoProduct";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import React from "react";
import { faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function SampleNextArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "transparent" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any; }) {
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

    const searchParams = useSearchParams();
    const param = searchParams.get('q1')

    let settings = {
        customPaging: function (i: number) {

            const index = i - 1;

            return (

                <a>
                    <img width={80} src={`https://gadgetgrid.ro/images/${param}/${props.data.id}/${props.data.photo[index + 1]}`} />
                </a>
            );
        },
        nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
        prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />,
        dotsClass: "slick-dots slick-thumb",
        initialSlide: props.image,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,


    };



    return (

        <div>
            <Slider {...settings}>

                {props.data.photo.map((element, index) => {
                    return (
                        <div key={index} className="space-y-2">
                            <TransformWrapper initialScale={1}>
                                {({ zoomIn, resetTransform }) => (
                                    <React.Fragment>
                                        <div className="flex justify-end gap-2 md:gap-5 text-lg">
                                            <button className="size-8" onClick={() => zoomIn()}>
                                                <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                                            </button>
                                            <button className="size-8" onClick={() => resetTransform()}>
                                                <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
                                            </button>
                                        </div>
                                        <TransformComponent>
                                            <img className="w-full" alt={`${props.data.name}`} src={`https://gadgetgrid.ro/images/${param}/${props.data.id}/${element}`} />
                                        </TransformComponent>
                                    </React.Fragment>
                                )}
                            </TransformWrapper>
                        </div>
                    );
                })}

            </Slider>

        </div>
    )


}

export default ReactSlick;