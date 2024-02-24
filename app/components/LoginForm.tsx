'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/auth";
import { SignInResponse } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";
import '../components/components.css';

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push(DEFAULT_LOGIN_REDIRECT);
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch (error) {
      console.error('Eroare în timpul autentificării:', error);
      setError('Ceva nu a funcționat corect. Vă rugăm să încercați din nou mai târziu.');
    }
  };


  const handleGitHubSignIn = async () => {
    const res: SignInResponse | undefined = await signIn('github', { callbackUrl: '/' });
    if (!res) {
      console.error('Error:', res);
    } else {
      router.push('/');
    }
  };

  return (

    <section className="grid h-screen place-items-center ">

      <div className="w-3/4 ">

        <div className="form-mod md:p-7 mx-auto" >
          <form className="form-mod" onSubmit={handleSubmit}>
            <p className="title">Sign In </p>
            <p className="message">connect now. </p>
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
            </div>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}</div>

            )}
            <button className="submit">Sign In</button>
          </form>

          <button className="border-2 p-2 rounded-xl" onClick={handleGitHubSignIn}>
            Sign in with GitHub
            <span> <FontAwesomeIcon className="px-2 text-lg" icon={faGithub} /></span>
          </button>

        </div>



        <p className="signin">Do not have an account yet? <Link href="/register">Sign up</Link> </p>
      </div>

    </section >
  )

}

