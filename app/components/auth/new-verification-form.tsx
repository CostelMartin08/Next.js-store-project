'use client'
import { useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";


import { newVerification } from "@/app/actions/new-verification";

export const NewVerificationForm = () => {

    const searchParams = useSearchParams();


    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {

        if (!token) return;

        newVerification(token);

    }, [token]);

    useEffect(() => {

        onSubmit();

    }, [onSubmit]);

    return (

        <div>

            <div>
                <h3>New verification!</h3>

                <a href="/auth/signIn">Click to login</a>
            </div>


            <BeatLoader />


        </div>
    )
}

