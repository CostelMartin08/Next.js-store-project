'use client'

import { modifyStatus } from "@/app/actions/modifyProducts";
import { ProductsStock } from "@/app/types";
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { LoadingModify } from "./loadingModify";

export interface StatusProductProps {
    data: {
        product: ProductsStock;
        index: number;
    };
}

export const StatusProduct: React.FC<StatusProductProps> = ({ data }) => {
    const { product, index } = data;
    const [state, setState] = useState(product.status);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setState(!state);
        modifyStatus(product, !state)
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                }
                setTimeout(() => {
                    setLoading(false);
                }, 900);
            })
            .catch((error) => {
                console.log(`Error fetching products ${error}`);
            });
    };

    return (
        <>
            <div className="h-24 w-full flex items-center justify-center relative" key={index}>
                {loading ? (
                    <LoadingModify />
                ) : (
                    <div className="md:space-x-2 flex flex-col md:flex-row items-center">
                        {state ? (
                            <>
                                <span className="p-2 hidden md:block rounded bg-green-300">Active</span>
                                <span className="block md:hidden size-3  bg-green-300 rounded-full"></span>
                            </>
                        ) : (
                            <>
                                <span className="p-2 hidden md:block rounded bg-red-300">Disabled</span>
                                <span className="block md:hidden size-3  bg-red-300 rounded-full"></span>
                            </>
                        )}
                        <FontAwesomeIcon
                            onClick={handleClick}
                            className="text-xs p-1 pb-0 cursor-pointer"
                            icon={faRepeat}
                        />
                    </div>
                )}
            </div>
        </>
    );
};
