'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";
import '../components.css';
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import localhostUrl from "@/nodeEnv";

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
            const res = await fetch(`${localhostUrl}/api/userExist`, {
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

                const res = await fetch(`${localhostUrl}/api/register`, {
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

        <section style={{ height: '90dvh' }} className="grid place-items-center ">

            <div className="md:w-3/4 container ">

                <form className="form-register p-3 rounded-lg md:p-7 mx-auto" onSubmit={handleSubmit}>
                    <p className="title text-2xl">register </p>

                    <label>
                        <input
                            className="input-register"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <span className="mt-1">Name</span>
                    </label>


                    <label>
                        <input
                            className="input-register"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="mt-1">Email</span>
                    </label>

                    <label>
                        <input
                            className="input-register"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="mt-1">Password</span>
                    </label>
                    <label>
                        <input
                            className="input-register"
                            type="password"
                            onChange={(e) => setRePassword(e.target.value)} />
                        <span className="mt-1">Confirm password</span>
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
                    <button style={{backgroundColor: 'rgb(26, 26, 26)'}} className="submit font-black">Submit</button>
                    <Link href="/signIn" className="border-2 p-2 rounded-xl text-[18px]  text-center">Continue with GitHub
                        <FontAwesomeIcon className=" px-4 text-[14px] sm:text-[23px] md:text-[25px]" icon={faGithub} />
                    </Link>


                </form>

                <p className="signin py-3">Already have an acount ? <Link href="/auth/signIn"> SignIn</Link> </p>
            </div>

        </section>

    )
}