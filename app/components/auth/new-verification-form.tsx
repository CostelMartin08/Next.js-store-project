'use client'
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { newVerification } from "@/app/actions/new-verification";


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
                setSuccess(data.success as string);
                setError(data.error as string);
            })
            .catch(() => {
                setError("Something went wrong!");
            })

    }, [token, success, error]);

    useEffect(() => {

        onSubmit();

    }, [onSubmit]);

    return (

        <div>

            <h3>New verification!</h3>

            <div className="flex items-center w-full justify-center">

                {!success && !error && (
                    <>
                        <BeatLoader />

                        <div className="bg-red-500 text-white w-fit text-sm py-2 px-3 rounded-md mt-1">
                            {success}
                        </div>

                        <div className="bg-green-500 text-white w-fit text-sm py-2 px-3 rounded-md mt-1">
                            {error}
                        </div>

                    </>
                )}

                <a href="/auth/signIn">Click to login</a>

            </div>
        </div>
    )
}

