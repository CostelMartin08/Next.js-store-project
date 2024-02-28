'use client'


import { useState } from "react"
import { reset } from "@/app/actions/reset";
import '../components.css';


export default function ResetForm() {


    const [email, setEmail] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            setError("Toate campurile sunt necesare!");
            return;
        }

        reset(email)
        .then((data) => {
            setSuccess(data.success as string);
            setError(data.error as string);
        })
        .catch(() => {
            setError("Something went wrong!");
        })

    }

    return (

        <section className="grid h-screen place-items-center ">

            <div className="w-3/4">

                <form className="form-register md:p-7 mx-auto" onSubmit={handleSubmit}>
                    <p className="title">Reset </p>
                    <p className="message">Forgot your password?</p>

                    <label>
                        <input
                            className="input-register"
                            type="email"
                            placeholder=""
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span>Email</span>
                    </label>

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
                    <button className="submit">Send reset Email</button>

                </form>


            </div>

        </section>

    )
}