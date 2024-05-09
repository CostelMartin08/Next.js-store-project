'use client'
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { newVerification } from "@/app/actions/new-verification";
import '../components.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

export const NewVerificationForm = () => {


    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const searchParams = useSearchParams();


    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {

        if (success || error) return;

        if (!token) {
            setError("Missing token!");
            return;
        }

        newVerification(token)
            .then((data) => {
                console.log(data)
                setSuccess(data.success as string);
                setError(data.error as string);
            })
            .catch(() => {
                setError("Something went wrong!");
            })

    }, [token, success, error]);

    console.log(error)
    useEffect(() => {

        onSubmit();

    }, [onSubmit]);

    return (

        <div className="w-100 h-dvh flex items-center">

            <div className="w-[30rem] h-2/4  container mx-auto  border">


                <h3 className="text-center pb-5 text-[30px]">New verification!</h3>

                <div className="flex flex-col space-y-10 items-center w-full justify-center">

                    {!success && !error && (
                        <div className="py-5">
                            <BeatLoader />

                        </div>
                    )}
                    {success && (

                        <div className="p-5 border text-center space-y-4 rounded  bg-green-500">
                            <FontAwesomeIcon className="text-[50px] text-white" icon={faCheck} />
                            <div className="bg-green-600 text-white w-fit text-sm py-2 px-3 rounded-md mt-1">
                                {success}
                            </div>
                           
                        </div>
                    )}
                    {error && (
                        <div className="p-5 border text-center space-y-4 rounded  bg-red-500">
                            <FontAwesomeIcon className="text-[50px] text-white" icon={faCircleExclamation} />
                            <div className="bg-red-600 text-white w-fit text-sm py-2 px-3 rounded-md mt-1">
                                {error}
                            </div>
                        </div>

                    )}


                </div>
            </div>
        </div >
    )
}

