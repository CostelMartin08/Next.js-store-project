'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";
import '../components.css';


export default function RegisterForm() {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [rePassword, setRePassword] = useState('');

    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Toate campurile sunt necesare!");
            return;
        }

        if (password !== rePassword) {
            setError("Parolele nu se potrivesc!");
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/userExist', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await res.json();

            if (user) {
                setError("This e-mail address is already used!");
                return;

            } else {

                const res = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({ name, email, password })
                });

                const data = await res.json();

                if (res.ok) {

                    setSucces(data.succes);
                    const form = e.target as HTMLFormElement;
                    form.reset();
                    //Probabil router.push dar cu ceva intarziere ps

                } else {

                    setError(data.error);
                }
            }

        } catch (error) {

            setError('Registration error. Please try again later!');
        }

    }

    return (

        <section className="grid h-screen place-items-center ">

            <div className="w-3/4">

                <form className="form-register md:p-7 mx-auto" onSubmit={handleSubmit}>
                    <p className="title">Register </p>
                    <p className="message">Signup now and get full access to our app. </p>
                    <div className="flex-register">

                        <label>
                            <input
                                className="input-register"
                                type="text"
                                placeholder=""
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span>Name</span>
                        </label>
                    </div>

                    <label>
                        <input
                            className="input-register"
                            type="email"
                            placeholder=""
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span>Email</span>
                    </label>

                    <label>
                        <input
                            className="input-register"
                            type="password"
                            placeholder=""
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span>Password</span>
                    </label>
                    <label>
                        <input
                            className="input-register"
                            type="password"
                            placeholder=""
                            onChange={(e) => setRePassword(e.target.value)} />
                        <span>Confirm password</span>
                    </label>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-2 px-3 rounded-md mt-1">
                            {error}
                        </div>
                    )}
                    {succes && (
                        <div className="bg-green-500 text-white w-fit text-sm py-2 px-3 rounded-md mt-1">
                            {succes}
                        </div>
                    )}
                    <button className="submit">Submit</button>
                    <Link href="/signIn" className="border-2 p-2 rounded-xl text-center">Continue with GitHub</Link>
                    <p className="signin">Already have an acount ? <Link href="/auth/signIn"> Signin</Link> </p>

                </form>


            </div>

        </section>

    )
}