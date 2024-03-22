'use client'

import ToggleSwitch from "./toggleSwitchSet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";

import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import Link from "next/link";
import "./components.css";


export const Navbar = () => {


    const user = useCurrentUser();
    const handleSubmit = () => {
        signOut();
    }

    return (

        <header className='container'>

            <section className="text-sm md:text-md flex py-6 w-full  sm:px-6 px-2">

                <div className="w-1/4 lg:hidden flex justify-start">


                    <ToggleSwitch />

                </div>

                <div className="w-2/4 lg:w-1/4 flex  items-center justify-center lg:justify-start ">

                    <Link href="/">
                        <h1 className="text-xl xl:text-2xl font-black">GandgetGrid</h1>
                    </Link>

                </div>

                <ul className="text-lg w-2/4 hidden lg:flex space-x-4 justify-center items-center clr-gray text-lg xl:text-xl">

                    <li><Link href="/myOrders">My Orders</Link></li>
                    <li><Link href="/settings">Settings</Link></li>

                    {user?.role === "ADMIN" && <li><Link href="/admin">Admin Mode</Link></li>}
                </ul>


                <div className="flex w-1/4 space-x-4 justify-end items-center">

                    <button className="cursor-pointer" onClick={handleSubmit}>
                        <FontAwesomeIcon className="text-[14px] sm:text-[23px] md:text-[25px]" icon={faArrowRightFromBracket} />
                    </button>

                    <div

                        className="hover-element cursor-pointer">

                        {user?.image ? <img className="size-7 rounded-full" src={`photo/${user?.image}`}></img> : <FontAwesomeIcon className="text-[14px] sm:text-[23px] md:text-[25px]" icon={faUser} />}

                    </div>

                </div>

            </section>


        </header >


    )
}
