'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";
import "../components.css";
import localhostUrl from "@/nodeEnv";

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
      const res = await fetch(`${localhostUrl}/api/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, code }),
      });

      if (res.ok) {

        router.push(DEFAULT_LOGIN_REDIRECT);
        window.location.reload();
      } else {
        const data = await res.json();

        if (data?.error) {
          setError(data.error as string);
        }

        if (data?.success) {
          setSucces(data.success as string);
        }
        if (data?.twoFactor) {
          setShowTwoFactor(true);
        }
      }
    } catch (error) {
      setError('SignIn error. Please try again later!');
    }
  };

  const onClick = (provider: "github") => {

    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });

  }

  return (

    <section
      style={{ height: '90dvh' }}
      className="grid place-items-center ">

      <div className="md:w-3/4 container ">

        <div className="form-mod p-3 rounded-lg md:p-7 mx-auto" >

          <form className="form-mod" onSubmit={handleSubmit}>
            <p className="title text-2xl">enter the account </p>

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
                      onChange={(e) => setEmail(e.target.value)} />
                    <span className="my-1">Email</span>
                  </label>

                  <label>
                    <input
                      className="input-form"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)} />
                    <span className="mt-1">Password</span>
                  </label>
                  <button className="ps-1 text-left text-gray-500 underline">
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
            <button style={{ backgroundColor: 'rgb(26, 26, 26)' }} className="submit font-black">{showTwoFactor ? "Confirm" : "SignIn"}</button>
          </form>

          <button className="border-2 p-2 rounded-xl text-[18px]  text-center" onClick={() => onClick("github")}
          >Continue with GitHub
            <FontAwesomeIcon className=" px-4 text-[16px] sm:text-[23px] md:text-[25px]" icon={faGithub} />
          </button>

        </div>
        <p className="signin py-4 ">Do not have an account yet? <Link className="font-black px-1" href="/auth/register">Sign up</Link> </p>
      </div>

    </section >
  )

}

