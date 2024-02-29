'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";
import "../components.css";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>('');
  const [succes, setSucces] = useState<string>('');
  const router = useRouter();


  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [code, setCode] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, code }),
      });

      if (res.ok) {

        router.push(DEFAULT_LOGIN_REDIRECT);

      } else {

        const data = await res.json();

        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          setSucces(data.success);
        }
        if (data?.twoFactor) {
          setShowTwoFactor(true);
        }

      }
    } catch (error) {
      setError('SignIn error. Please try again later!');
    }
  };


  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });

  }

  return (

    <section className="grid h-screen place-items-center ">

      <div className="w-3/4 ">

        <div className="form-mod md:p-7 mx-auto" >

          <form className="form-mod" onSubmit={handleSubmit}>
            <p className="title">Sign In </p>
            <p className="message">connect now. </p>
            {showTwoFactor && (
              <>
                <div className="flex-area">
                  <label>
                    <input
                      className="input-form"
                      type="text"
                      placeholder="123456"
                      onChange={(e) => setCode(e.target.value)} />

                    <span>2FA</span>
                  </label>
                  <button>
                    <Link href="/auth/reset">Forgot password?</Link>
                  </button>
                </div>
              </>
            )}
            {!showTwoFactor && (
              <>
                <div className="flex-area">
                  <label>
                    <input
                      className="input-form"
                      type="text"
                      placeholder=""
                      onChange={(e) => setEmail(e.target.value)} />
                    <span>Email</span>
                  </label>

                  <label>
                    <input
                      className="input-form"
                      type="password"
                      placeholder=""
                      onChange={(e) => setPassword(e.target.value)} />
                    <span>Password</span>
                  </label>
                  <button>
                    <Link href="/auth/reset">Forgot password?</Link>
                  </button>
                </div>
              </>
            )}
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}</div>

            )}
            {succes && (
              <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {succes}</div>

            )}
            <button className="submit">{showTwoFactor ? "Confirm" : "SignIn"}</button>
          </form>

          <button className="border-2 p-2 rounded-xl" onClick={() => onClick("github")}>
            Sign in with GitHub
            <span> <FontAwesomeIcon className="px-2 text-lg" icon={faGithub} /></span>
          </button>

        </div>



        <p className="signin">Do not have an account yet? <Link href="/auth/register">Sign up</Link> </p>
      </div>

    </section >
  )

}

