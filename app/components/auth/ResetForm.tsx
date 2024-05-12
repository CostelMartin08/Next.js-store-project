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
            return setError("This field is required!");
        }

        reset(email)
            .then((data) => {
                setError('');
                return setSuccess(data.success as string);

            })
            .catch((error) => {
                setError(error);
            })

    }

    return (

        <section style={{ height: '90dvh' }} className="grid place-items-center ">

            <div className="md:w-3/4 container">

                <form className="form-register md:p-7 mx-auto rounded-md" onSubmit={handleSubmit}>
                    <p className="title text-2xl">reset password </p>
                    <p className="message">Enter your e-mail</p>

                    <label>
                        <input
                            className="input-register"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="mt-1">Email</span>
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
                    <button style={{ backgroundColor: 'rgb(26, 26, 26)' }} className="submit font-black">Send reset Email</button>

                </form>


            </div>

        </section>

    )
}