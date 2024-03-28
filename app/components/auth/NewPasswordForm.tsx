'use client'


import { useState } from "react"
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/app/actions/new-password";
import '../components.css';


export default function NewPassordForm() {


    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        newPassword(password, token as string)
            .then((data) => {
                console.log(data)
                setError(data?.error as string);
                setSuccess(data?.success as string);
            });

    }

    return (

        <section className="grid h-screen place-items-center ">

            <div className="md:w-3/4 container">

                <form className="form-register md:p-7 rounded-lg mx-auto space-y-3" onSubmit={handleSubmit}>
                    <p className="title text-2xl">enter a new password</p>

                    <label>
                        <input
                            className="input-register"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="mt-1">Password</span>
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
                    <button className="submit bg-emerald-950 font-black">Reset Password</button>

                </form>

            </div>

        </section>

    )
}